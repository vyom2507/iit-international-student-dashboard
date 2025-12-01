// components/campus-navigation/CampusMap.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngTuple } from "leaflet";
import { Card } from "@/components/ui/Card";
import "leaflet/dist/leaflet.css";

// OpenRouteService API key
const OPENROUTESERVICE_API_KEY =
  process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY ||
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjE1NmE0ZTA0NzhjOTQ2NGRhNzZmNTE1OWIxYzJjYmI4IiwiaCI6Im11cm11cjY0In0=";

// Dynamic imports to avoid SSR issues with react-leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// IIT campus center
const IIT_CENTER: LatLngTuple = [41.8349, -87.6270];

// Named locations on/near campus
const START_LOCATIONS: {
  id: string;
  label: string;
  coords: LatLngTuple;
}[] = [
  {
    id: "dorms",
    label: "Dorms / IIT Tower (Default)",
    coords: [41.8359, -87.6266]
  },
  {
    id: "mtcc",
    label: "MTCC (Student Center)",
    coords: [41.8355, -87.6271]
  },
  {
    id: "cta",
    label: "CTA Green/Red Line (35th-Bronzeville-IIT)",
    coords: [41.8318, -87.6264]
  }
];

const DESTINATIONS: {
  id: string;
  label: string;
  coords: LatLngTuple;
  description: string;
}[] = [
  {
    id: "mtcc",
    label: "MTCC (Student Center)",
    coords: [41.8355, -87.6271],
    description: "Student center, food, lounges, and many events."
  },
  {
    id: "hermann",
    label: "Hermann Hall",
    coords: [41.8359, -87.6249],
    description:
      "Many orientation events, conferences, and large gatherings happen here."
  },
  {
    id: "galvin",
    label: "Galvin Library",
    coords: [41.8353, -87.6288],
    description:
      "Main library for quiet study, group rooms, and research support."
  },
  {
    id: "keating",
    label: "Keating Sports Center",
    coords: [41.8345, -87.624],
    description: "Gym, fitness, and sports activities."
  },
  {
    id: "stuart",
    label: "Stuart Building",
    coords: [41.8348, -87.6279],
    description: "Classrooms and labs for engineering & tech courses."
  },
  {
    id: "cta",
    label: "CTA 35th-Bronzeville-IIT Station",
    coords: [41.8318, -87.6264],
    description: "Green/Red line stop right by campus."
  }
];

export function CampusMap() {
  const [startId, setStartId] = useState<string>("dorms");
  const [destinationId, setDestinationId] = useState<string>("mtcc");
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [summary, setSummary] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

  const handleRoute = async () => {
    setErrorMsg(null);
    setRoute([]);
    setSummary(null);

    const start = START_LOCATIONS.find((s) => s.id === startId);
    const dest = DESTINATIONS.find((d) => d.id === destinationId);

    if (!start || !dest) {
      setErrorMsg("Please select both a start and a destination.");
      return;
    }

    if (!OPENROUTESERVICE_API_KEY) {
      setErrorMsg("OpenRouteService API key is missing.");
      return;
    }

    setLoading(true);
    try {
      // ORS expects [lon, lat]
      const startLon = start.coords[1];
      const startLat = start.coords[0];
      const destLon = dest.coords[1];
      const destLat = dest.coords[0];

      const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${encodeURIComponent(
        OPENROUTESERVICE_API_KEY
      )}&start=${startLon},${startLat}&end=${destLon},${destLat}`;

      const res = await fetch(url);
      const data = await res.json();

      if ((data as any).error) {
        console.error("ORS error:", (data as any).error);
        setErrorMsg(
          (data as any).error.message ||
            "Routing service returned an error. Try different points."
        );
        return;
      }

      const feature = data?.features?.[0];
      const coords = feature?.geometry?.coordinates;

      if (!coords || !Array.isArray(coords)) {
        console.error("Unexpected ORS data:", data);
        setErrorMsg("Route data was not in expected format.");
        return;
      }

      const routeSummary = feature?.properties?.summary;
      if (
        routeSummary &&
        typeof routeSummary.distance === "number" &&
        typeof routeSummary.duration === "number"
      ) {
        setSummary({
          distance: routeSummary.distance,
          duration: routeSummary.duration
        });
      }

      const latLngs: LatLngTuple[] = coords.map((c: [number, number]) => [
        c[1],
        c[0]
      ]);

      setRoute(latLngs);
    } catch (err) {
      console.error("Route fetch error:", err);
      setErrorMsg("Something went wrong while contacting the routing service.");
    } finally {
      setLoading(false);
    }
  };

  const startLocation = START_LOCATIONS.find((s) => s.id === startId);
  const destination = DESTINATIONS.find((d) => d.id === destinationId);

  const formattedSummary = (() => {
    if (!summary) return null;
    const km = summary.distance / 1000;
    const minutes = Math.round(summary.duration / 60);
    return {
      distanceLabel: `${km.toFixed(2)} km`,
      timeLabel: `${minutes} min`
    };
  })();

  return (
    <Card className="relative z-0 overflow-hidden border border-gray-200 bg-gray-100 p-0 text-slate-900">
      {/* Control bar */}
      <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-100 px-3 py-3 text-xs md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            IIT Campus Navigation
          </h2>
          <p className="text-[11px] text-slate-600">
            Choose where you&apos;re starting from and where you want to go on
            campus. We&apos;ll draw a walking route and estimate walking time.
          </p>

          {formattedSummary && startLocation && destination && (
            <p className="mt-1 text-[11px] text-emerald-700">
              Approx.{" "}
              <span className="font-semibold">
                {formattedSummary.distanceLabel}
              </span>{" "}
              ·{" "}
              <span className="font-semibold">
                {formattedSummary.timeLabel} walking
              </span>{" "}
              from <span className="font-semibold">{startLocation.label}</span>{" "}
              to <span className="font-semibold">{destination.label}</span>.
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Start from
            </label>
            <select
              value={startId}
              onChange={(e) => setStartId(e.target.value)}
              className="h-8 rounded-md border border-gray-300 bg-white px-2 text-[11px] text-slate-900 focus:border-red-500 focus:outline-none"
            >
              {START_LOCATIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Take me to
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="h-8 rounded-md border border-gray-300 bg-white px-2 text-[11px] text-slate-900 focus:border-red-500 focus:outline-none"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleRoute}
            disabled={loading}
            className="inline-flex h-8 items-center justify-center rounded-md bg-red-600 px-3 text-[11px] font-semibold text-white shadow-sm hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
          >
            {loading ? "Finding route…" : "Show walking route"}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="border-b border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Map */}
      <div className="relative z-0 h-[420px] w-full bg-gray-200">
        <MapContainer
          center={IIT_CENTER}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {startLocation && (
            <Marker position={startLocation.coords}>
              <Popup>
                <div className="text-[11px]">
                  <strong>Start: {startLocation.label}</strong>
                </div>
              </Popup>
            </Marker>
          )}

          {destination && (
            <Marker position={destination.coords}>
              <Popup>
                <div className="text-[11px]">
                  <strong>Destination: {destination.label}</strong>
                  <br />
                  <span className="text-[10px] text-slate-700">
                    {destination.description}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {DESTINATIONS.map((d) => (
            <Marker key={d.id} position={d.coords}>
              <Popup>
                <div className="text-[11px]">
                  <strong>{d.label}</strong>
                  <br />
                  <span className="text-[10px] text-slate-700">
                    {d.description}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

          {route.length > 0 && (
            <Polyline
              positions={route}
              pathOptions={{ color: "red", weight: 4, opacity: 0.8 }}
            />
          )}
        </MapContainer>
      </div>
    </Card>
  );
}
