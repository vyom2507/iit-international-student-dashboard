import type { ReactNode } from "react";
import { MarketplaceCartLayoutClient } from "@/components/marketplace/MarketplaceCartLayoutClient";

export default function MarketplaceLayout({
  children
}: {
  children: ReactNode;
}) {
  // This is a server component, so we delegate to a client wrapper.
  return <MarketplaceCartLayoutClient>{children}</MarketplaceCartLayoutClient>;
}
