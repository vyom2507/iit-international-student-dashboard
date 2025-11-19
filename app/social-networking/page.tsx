"use client";

import { SocialHero } from "@/components/social-networking/SocialHero";
import { GroupsDirectory } from "@/components/social-networking/GroupsDirectory";
import { EventsFeed312 } from "@/components/social-networking/EventsFeed312";
import { MentorConnections } from "@/components/social-networking/MentorConnections";

export default function SocialNetworkingPage() {
  return (
    <div className="space-y-6">
      <SocialHero />

      <section className="grid gap-4 xl:grid-cols-[1.7fr,1.3fr]">
        <GroupsDirectory />
        <EventsFeed312 />
      </section>

      <MentorConnections />
    </div>
  );
}
