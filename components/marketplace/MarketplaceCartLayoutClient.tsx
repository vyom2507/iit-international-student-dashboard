"use client";

import type { ReactNode } from "react";
import { MarketplaceCartProvider } from "./MarketplaceCartContext";

export function MarketplaceCartLayoutClient({
  children
}: {
  children: ReactNode;
}) {
  return <MarketplaceCartProvider>{children}</MarketplaceCartProvider>;
}
