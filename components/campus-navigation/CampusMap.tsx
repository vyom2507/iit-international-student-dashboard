"use client";

import { useEffect, useRef, useState } from "react";
import L, { Map as LeafletMap, LatLngExpression, Polyline } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/Card";
import { MapPin, Navigation, Clock } from "lucide-react";

type LatLngTuple = [number, number];

const PLACES = {
  mtcc: {
    id: "mtcc",
    name: "McCormick Tribune Campus Center (MTCC)",
    coords: [41.8349, -87.6270] as LatLngTuple
  },
  galvin: {
    id: "galvin",
    name: "Paul V. Galvin Library",
    coords: [41.8359, -87.6278] as LatLngTuple
  },
  kaplan: {
    id: "kaplan",
    name: "Kaplan Institute",
    coords: [41.8337, -87.6275] as LatLngTuple
  },
  roweVillage: {
    id: "roweVillage",
    name: "Rowe Village Residence Hall",
    coords: [41.8319, -87.6259] as LatLngTuple
  },
  greenLine: {
    id: "greenLine",
    name: "35th–Bronzeville–IIT (Green Line)",
    coords: [41.8328, -87.6253] as LatLngTuple
  },
  redLine: {
    id: "redLine",
    name: "Sox–35th (Red Line)",
    coords: [41.8312, -87.6307] as LatLngTuple
  }
};

type PlaceId = keyof typeof PLACES;

export function CampusMap() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const routeRef = useRef<Polyline | null>(null);

  const [origin, setOrigin] = useState<PlaceId>("roweVillage");
  const [destination, setDestination] = useState<PlaceId>("mtcc");
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distanceText, setDistanceText] = useState<string | null>(null);
  const [durationText, setDurationText] = useState<string | null>(null);

  // Initialize Leaflet map once
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const center: LatLngExpression = [41.8341, -87.6237]; // IIT Mies Campus
    const map = L.map(mapContainerRef.current).setView(center, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Add markers for all defined places
    Object.values(PLACES).forEach((place) => {
      L.marker(place.coords)
        .addTo(map)
        .bindPopup(place.name);
    });

    mapRef.current = map;
  }, []);

  const fetchRoute = async () => {
    setError(null);
    setDistanceText(null);
    setDurationText(null);

    if (origin === destination) {
      setError("Origin and destination cannot be the same.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;
    if (!apiKey) {
      setError("Missing NEXT_PUBLIC_ORS_API_KEY in .env.local");
      return;
    }

    const originPlace = PLACES[origin];
    const destPlace = PLACES[destination];

    const [originLat, originLng] = originPlace.coords;
    const [destLat, destLng] = destPlace.coords;

    // openrouteservice expects: start=lng,lat & end=lng,lat
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${encodeURIComponent(
      apiKey
    )}&start=${originLng},${originLat}&end=${destLng},${destLat}`;

    try {
      setLoadingRoute(true);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Route request failed (${res.status})`);
      }

      const data = await res.json();
      const feature = data.features?.[0];
      const coords = feature?.geometry?.coordinates || [];
      const summary = feature?.properties?.summary;

      if (!coords.length) {
        throw new Error("No route found between these locations.");
      }

      const latlngs: LatLngExpression[] = coords.map((c: number[]) => [
        c[1], // lat
        c[0]  // lng
      ]);

      if (mapRef.current) {
        // Remove previous route
        if (routeRef.current) {
          routeRef.current.removeFrom(mapRef.current);
        }

        // Draw new route
        routeRef.current = L.polyline(latlngs, {
          color: "#f97373",
          weight: 4
        }).addTo(mapRef.current);

        mapRef.current.fitBounds(routeRef.current.getBounds(), {
          padding: [24, 24]
        });
      }

      if (summary) {
        // distance in meters, duration in seconds
        const distanceKm = (summary.distance || 0) / 1000;
        const durationMin = Math.round((summary.duration || 0) / 60);

        setDistanceText(`${distanceKm.toFixed(2)} km`);
        setDurationText(`${durationMin} min`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load route from openrouteservice.");
    } finally {
      setLoadingRoute(false);
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              IIT Campus Navigation (OpenRouteService)
            </h2>
            <p className="text-xs text-slate-400">
              Find routes between dorms, stations, and key buildings on IIT&apos;s
              Mies Campus using openrouteservice and OpenStreetMap.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-[10px] text-slate-200 ring-1 ring-slate-700">
          <Navigation className="h-3 w-3" />
          openrouteservice · driving-car
        </span>
      </header>

      <div className="mb-3 grid gap-2 text-xs sm:grid-cols-[1.6fr,1fr]">
        {/* Map */}
        <div
          ref={mapContainerRef}
          className="h-64 rounded-xl bg-slate-950 ring-1 ring-slate-800"
        />

        {/* Controls */}
        <div className="flex flex-col gap-2 rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 text-[11px] font-semibold text-slate-100">
              Plan your campus route
            </p>
            <p className="text-[10px] text-slate-400">
              Choose where you&apos;re starting and where you&apos;re going on IIT
              Mies Campus. We&apos;ll draw the route and estimate distance &
              travel time.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-300">From</label>
              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                value={origin}
                onChange={(e) => setOrigin(e.target.value as PlaceId)}
              >
                {Object.values(PLACES).map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-300">To</label>
              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-[11px] text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value as PlaceId)}
              >
                {Object.values(PLACES).map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchRoute}
            disabled={loadingRoute}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-md shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-800"
          >
            <Navigation className="mr-1 h-3.5 w-3.5" />
            {loadingRoute ? "Finding route..." : "Get route with ORS"}
          </button>

          {error && (
            <p className="mt-1 text-[10px] text-red-300">Error: {error}</p>
          )}

          {distanceText && durationText && (
            <div className="mt-2 rounded-lg bg-slate-900/90 p-2 text-[11px] text-slate-100 ring-1 ring-slate-800">
              <p className="flex items-center gap-1 font-semibold">
                <Clock className="h-3.5 w-3.5 text-red-300" />
                Estimated route
              </p>
              <p className="mt-1 text-[11px] text-slate-200">
                Distance: <span className="font-semibold">{distanceText}</span>
              </p>
              <p className="text-[11px] text-slate-200">
                Duration: <span className="font-semibold">{durationText}</span>
              </p>
            </div>
          )}

          {!error && !distanceText && !loadingRoute && (
            <p className="mt-1 text-[10px] text-slate-500">
              Tip: To focus on walking routes, change the URL path from{" "}
              <code>driving-car</code> to <code>foot-walking</code> in the
              fetch call.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
