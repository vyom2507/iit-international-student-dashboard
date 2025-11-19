"use client";

import { CampusMap } from "@/components/campus-navigation/CampusMap";
import { Card } from "@/components/ui/Card";

export default function CampusNavigationPage() {
  return (
    <div className="space-y-6">
      <CampusMap />

      <Card>
        <h2 className="mb-1 text-sm font-semibold text-slate-50">
          About IIT Campus Navigation
        </h2>
        <p className="text-xs text-slate-300">
          This campus navigation module uses OpenStreetMap for map tiles and
          openrouteservice for route calculation. You can extend it with more
          buildings, accessibility information, shuttle stops, and live data
          from IIT or istudentshub.com.
        </p>
      </Card>
    </div>
  );
}
