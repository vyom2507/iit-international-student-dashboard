# IIT International Student Onboarding Dashboard (with Marketplace)

A modern, mobile-first dashboard designed to support **international students at
Illinois Institute of Technology (IIT)** as they transition to campus. Built
with **Next.js 14**, **React**, and **Tailwind CSS** and prepared for external
APIs (IIT systems, calendar, chat, mapping, and a student marketplace).

## Major Features in the portal

- Sticky red-gradient navbar with:
  - Profile avatar and settings dropdown (Update Profile, Change Password, Logout)
  - Notifications icon with badge
  - Language switcher (EN / ES) via a simple i18n context
- Black sidebar with red active & hover states:
  - Dashboard
  - Pre-Arrival
  - Campus Navigation
  - Academic Integration
  - Social Networking
  - Resource Directory
  - **Marketplace (Student Used-Items Exchange)**
- Dashboard (`/`) with:
  - 4 feature cards (Pre-Arrival, Campus Navigation, Academic Integration, Social & Community)
  - 2-column section:
    - Group Messaging (real-time ready)
    - IIT Campus Event Calendar (calendar API-ready)
  - 2-column section:
    - **Campus Social Groups carousel**
    - **Student Marketplace carousel with pictures + descriptions**
- Module pages (including `/marketplace`) pre-wired for external APIs with a reusable `ModuleShell`
- Tailwind CSS for responsive design, optimized for smartphone usage

---

## 1. Install & Run Locally

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 2. Suggested External APIs

You can wire the modules to free APIs while your IIT backend is in progress:

- **Maps & Navigation**
  - Leaflet + OpenStreetMap (no key needed)
  - Nominatim (OpenStreetMap geocoding)
- **Pre-Arrival**
  - Open-Meteo (weather for Chicago)
  - ExchangeRate.host (currency conversion)
- **Calendar**
  - Google Calendar API (public calendar)
  - IIT event feeds (when available)
- **Messaging**
  - Pusher / Ably (free tiers) or your own WebSocket server
- **Marketplace**
  - Your own IIT-secured backend (recommended)
  - Or prototype with:
    - Fake Store API: https://fakestoreapi.com
    - DummyJSON Products: https://dummyjson.com/docs/products

Search for `TODO:` comments in the code to see integration hints.

---

## 3. Environment Variables

Create a `.env.local` file for real APIs, for example:

```bash
NEXT_PUBLIC_IIT_API_BASE_URL="https://api.iit.edu"
NEXT_PUBLIC_IIT_MARKETPLACE_API_BASE_URL="https://marketplace-api.iit.edu"
NEXT_PUBLIC_IIT_CALENDAR_API_BASE_URL="https://calendar-api.iit.edu"
```

Then reference these inside your fetch calls in the module pages.

---

## 4. Deploying Online

You can deploy this app easily with **Vercel**:

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add environment variables under Project Settings → Environment Variables.
4. Deploy – Vercel will auto-detect it as a Next.js app.

Other options: Netlify, Render, or your own server/container.

---

## 5. Next Steps

- Connect each module to IIT APIs or temporary free APIs.
- Implement authentication using IIT’s identity provider (Okta, SSO, etc.).
- Replace mock marketplace carousel data with live listings from your marketplace API.
