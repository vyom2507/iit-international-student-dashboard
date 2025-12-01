"use client";

import { Card } from "@/components/ui/Card";
import {
  ShoppingBag,
  CreditCard,
  Wifi,
  Church,
  Coffee
} from "lucide-react";

interface Amenity {
  id: string;
  name: string;
  type: string;
  description: string;
  tips: string;
  icon: React.ComponentType<any>;
}

const amenities: Amenity[] = [
  {
    id: "groceries",
    name: "Groceries & Essentials",
    type: "Food & supplies",
    description:
      "Nearby supermarkets, small markets, and convenience stores for everyday food and toiletries.",
    tips:
      "Add a map view with walking times from campus housing, and highlight student-friendly options.",
    icon: ShoppingBag
  },
  {
    id: "banking",
    name: "Banking & ATMs",
    type: "Money & banking",
    description:
      "Local banks, ATMs, and guidance on opening a U.S. bank account as an international student.",
    tips:
      "Include notes on required documents (passport, I-20, proof of address) and typical account types.",
    icon: CreditCard
  },
  {
    id: "mobile",
    name: "Mobile / SIM Cards",
    type: "Phone & data",
    description:
      "Stores and kiosks where you can purchase prepaid SIM cards or student-friendly phone plans.",
    tips:
      "Explain key differences between prepaid and post-paid plans and how to keep your number.",
    icon: Wifi
  },
  {
    id: "worship",
    name: "Places of Worship",
    type: "Community & faith",
    description:
      "Local religious and spiritual centers of different traditions accessible from campus.",
    tips:
      "Provide links for different faith communities and how to get there by transit.",
    icon: Church
  },
  {
    id: "study-spots",
    name: "Coffee & Study Spots",
    type: "Study & hangouts",
    description:
      "Cafés, library spaces, and quiet study areas where students commonly meet up or work.",
    tips:
      "Combine ratings from students with operating hours and Wi-Fi availability.",
    icon: Coffee
  }
];

export function LocalAmenitiesGrid() {
  return (
    <Card>
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Local Amenities Around Campus
        </h2>
        <p className="text-xs text-slate-700">
          Essentials for daily life in Chicago near IIT—great to explore in your
          first weeks on campus.
        </p>
      </header>

      <div className="grid gap-2 text-xs md:grid-cols-2">
        {amenities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-2 rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-slate-200 ring-1 ring-slate-700">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {item.name}
                </p>
                <p className="text-[10px] text-slate-300">{item.type}</p>
                <p className="mt-1 text-[10px] text-slate-300">
                  {item.description}
                </p>
                <p className="mt-1 text-[9px] text-slate-500">
                  TODO: Use campus navigation & map APIs to show exact locations
                  and routes from each residence hall.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
