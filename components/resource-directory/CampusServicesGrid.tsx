"use client";

import { Card } from "@/components/ui/Card";
import {
  Building2,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  MessageCircleQuestion
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ComponentType<any>;
  suggestedPath?: string;
}

const services: Service[] = [
  {
    id: "intl-center",
    name: "International Student & Scholar Services",
    role: "Immigration, visas, and cultural support",
    description:
      "Help with I-20/DS-2019 questions, travel signatures, visa status, and workshops for international students.",
    icon: Building2,
    suggestedPath: "Connect via IIT international office site / portal."
  },
  {
    id: "academic-advising",
    name: "Academic Advising",
    role: "Course planning & degree progress",
    description:
      "Work with your academic adviser or departmental advising team to pick courses and stay on track to graduate.",
    icon: GraduationCap,
    suggestedPath: "Link to advising pages and adviser contact pulled from SIS."
  },
  {
    id: "career-services",
    name: "Career Services",
    role: "Internships, jobs, and OPT/CPT guidance",
    description:
      "Support for resumes, interviews, job fairs, and understanding work options like CPT and OPT as an international student.",
    icon: BriefcaseBusiness,
    suggestedPath: "Point to the career portal and appointment booking tools."
  },
  {
    id: "health-center",
    name: "Student Health & Wellness",
    role: "Medical care and immunizations",
    description:
      "Basic medical care, immunization requirements, and referrals to local clinics or hospitals when needed.",
    icon: HeartPulse,
    suggestedPath: "Surface hours, location, and insurance details from IIT."
  },
  {
    id: "counseling",
    name: "Counseling & Mental Health",
    role: "Emotional support and counseling",
    description:
      "Confidential counseling, crisis support, and workshops on adjusting to life in the U.S. and managing stress.",
    icon: MessageCircleQuestion,
    suggestedPath: "Show emergency vs non-emergency contacts and intake form."
  }
];

export function CampusServicesGrid() {
  return (
    <Card>
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-slate-80">
          Campus Services & Support
        </h2>
        <p className="text-xs text-slate-600">
          Key offices that international students visit most often. Use this
          as a launchpad into official IIT websites and systems.
        </p>
      </header>

      <div className="grid gap-2 text-xs md:grid-cols-2">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="flex items-start gap-2 rounded-xl bg-slate-900/70 p-2.5 ring-1 ring-slate-800"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-50">
                  {svc.name}
                </p>
                <p className="text-[10px] text-slate-300">{svc.role}</p>
                <p className="mt-1 text-[10px] text-slate-100">
                  {svc.description}
                </p>
                {svc.suggestedPath && (
                  <p className="mt-1 text-[9px] text-slate-500">
                    TODO: {svc.suggestedPath}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
