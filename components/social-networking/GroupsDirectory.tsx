"use client";

import { Card } from "@/components/ui/Card";
import { Users2, ArrowUpRight, HeartHandshake, Globe2, Trophy } from "lucide-react";

interface GroupCard {
  id: string;
  name: string;
  category: "Cultural" | "Faith & Community" | "Sports & Recreation" | "Academic / Professional" | "Campus Services";
  membersLabel: string;
  eventsLabel: string;
  summary: string;
  url: string;
  tags: string[];
}

const groups: GroupCard[] = [
  {
    id: "soccer",
    name: "IIT Soccer Club",
    category: "Sports & Recreation",
    membersLabel: "Open pickup + competitive team",
    eventsLabel: "Regular games & tryouts via 312",
    summary:
      "Join casual pickup games or try out for the competitive team on Keating and Stuart Field. Great for meeting students from many countries.",
    url: "https://312.iit.edu/soccer/",
    tags: ["sports", "recreation", "all skill levels"]
  },
  {
    id: "cru",
    name: "Cru at Illinois Tech",
    category: "Faith & Community",
    membersLabel: "37+ members · 10 officers*",
    eventsLabel: "Weekly meetings & special events",
    summary:
      "Christian student community focused on authentic fellowship, discussions, and events throughout the semester.",
    url: "https://312.iit.edu/cru/",
    tags: ["faith", "community", "weekly events"]
  },
  {
    id: "itmo",
    name: "Information Technology and Management Organization (ITMO)",
    category: "Academic / Professional",
    membersLabel: "ITM-focused community",
    eventsLabel: "Tech talks, socials, and mentoring",
    summary:
      "Supports ITM students with peer mentoring, events, and industry connections. A good home base if you are in computing.",
    url: "https://312.iit.edu/", // generic 312; specific ITMO link can replace later
    tags: ["ITM", "professional", "peer support"]
  },
  {
    id: "acm",
    name: "ACM at Illinois Tech",
    category: "Academic / Professional",
    membersLabel: "Computing-focused chapter",
    eventsLabel: "Coding events, speakers, competitions",
    summary:
      "Illinois Tech&apos;s chapter of the Association for Computing Machinery, with events around programming, competitions, and networking.",
    url: "https://312.iit.edu/",
    tags: ["computing", "coding", "networking"]
  },
  {
    id: "galvin",
    name: "Galvin Library Events & Workshops",
    category: "Campus Services",
    membersLabel: "Library-hosted events",
    eventsLabel: "Workshops, socials, study sessions",
    summary:
      "From research skills to creative events, the library regularly posts events on 312 that help you study and meet new people.",
    url: "https://312.iit.edu/galvin/",
    tags: ["library", "workshops", "support"]
  },
  {
    id: "intl",
    name: "International Student & Cultural Groups",
    category: "Cultural",
    membersLabel: "Multiple cultural orgs",
    eventsLabel: "Festivals, dinners, cultural nights",
    summary:
      "Explore cultural clubs representing countries and regions from around the world. Celebrate holidays, share food, and make friends.",
    url: "https://312.iit.edu/groups",
    tags: ["culture", "community", "celebrations"]
  }
];

export function GroupsDirectory() {
  return (
    <Card>
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <Users2 className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Discover Student Groups (via 312)
            </h2>
            <p className="text-xs text-slate-700">
              A sample of IIT organizations you&apos;ll find on 312. Browse here,
              then join officially on the 312 platform.
            </p>
          </div>
        </div>
        <a
          href="https://312.iit.edu/groups"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold text-red-200 ring-1 ring-red-500/50 hover:bg-black/60"
        >
          View all groups on 312
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </header>

      <div className="grid gap-2 text-xs md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
          >
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-slate-100">
                  {group.name}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[9px] text-slate-300 ring-1 ring-slate-700">
                  {group.category === "Cultural" && <Globe2 className="h-3 w-3" />}
                  {group.category === "Faith & Community" && (
                    <HeartHandshake className="h-3 w-3" />
                  )}
                  {group.category === "Sports & Recreation" && (
                    <Trophy className="h-3 w-3" />
                  )}
                  <span>{group.category}</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-300">{group.summary}</p>
              <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-slate-400">
                <span>{group.membersLabel}</span>
                <span>•</span>
                <span>{group.eventsLabel}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-300 ring-1 ring-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <a
                href={group.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-300 hover:text-red-200"
              >
                Open on 312
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-[9px] text-slate-500">
                TODO: Replace with live group data from 312 / CampusGroups API.
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
