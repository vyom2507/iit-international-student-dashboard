"use client";

import { ResourceHero } from "@/components/resource-directory/ResourceHero";
import { CampusServicesGrid } from "@/components/resource-directory/CampusServicesGrid";
import { LocalAmenitiesGrid } from "@/components/resource-directory/LocalAmenitiesGrid";
import { TransportationGrid } from "@/components/resource-directory/TransportationGrid";
import { EmergencyContactsPanel } from "@/components/resource-directory/EmergencyContactsPanel";

export default function ResourceDirectoryPage() {
  return (
    <div className="space-y-6">
      <ResourceHero />

      <section className="grid gap-4 xl:grid-cols-[1.4fr,1.6fr]">
        <CampusServicesGrid />
        <LocalAmenitiesGrid />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr,1.6fr]">
        <TransportationGrid />
        <EmergencyContactsPanel />
      </section>
    </div>
  );
}
