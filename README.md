# 🏛️ Cultural Quest KL

> **Live Interactive App:** [Click Here to Test Cultural Quest KL](https://pasar-quest.base44.app)  


---

## 📌 About The Project

**Cultural Quest KL** is an AI-powered cultural exploration platform that transforms Kuala Lumpur's iconic Central Market (*Pasar Seni*) into an interactive, gamified quest trail. 

Tourists and locals discover local artisan shops, earn points, unlock scratch-card rewards, and book live cultural experiences—all while shopkeepers track real-time foot traffic and festival organizers manage seasonal themes.

**NOTE on Scope: While this implementation uses Central Market in Kuala Lumpur as its primary case study and testbed, the platform framework is modular and scalable. The underlying mechanics, quest engines, and vendor integration models are designed to be easily adapted to traditional markets, heritage districts, and cultural bazaars worldwide.

---

## ✨ Key Features & User Roles

### 🎒 Visitor (Explorer)
* **Interactive Quest Trails:** Explore themed categories (Food, Art, Souvenirs, Crafts) with QR check-ins, cultural background stories, and product details.
* **AI Custom Trail Generator:** Dynamic itinerary generator based on available time, budget, weather, and interests—combining shop stops with live workshops.
* **Gamification & Milestone Rewards:** Earn points per check-in, level up across a 6-tier roadmap (Wanderer → Legend), and unlock interactive scratch-card rewards.
* **Live Experience Bookings:** Browse and reserve Cultural Events (with visual seat mapping), Workshops, and Restaurant tables directly in-app.
* **Multilingual AI Assistant:** 8-language localization with a floating AI chatbot for instant cultural context and navigation help.

### 🏪 Shopkeeper (Business Owner)
* **Live Foot-Traffic Dashboard:** Monitor active check-ins, visitor volume, and customers currently en-route.
* **Flash Deals & Happy Hours:** Launch time-limited promotions to drive instant foot traffic during slow hours.
* **Inventory & Storytelling Manager:** Add products along with heritage stories and photos.

### 🛡️ Admin (Festival Organizer)
* **Festival Theme Switcher:** Instantly update app-wide styling, emojis, and visual decorations to match seasonal events (e.g., Hari Raya, Deepavali, CNY).
* **Market-Wide Analytics:** Track overall visitor engagement, completion rates, and active shop performance.

---

## 🎯 Problem & Real-World Impact

* **The Problem:** Cultural landmarks like Central Market struggle to engage younger, digitally native tourists who often skip over the rich history behind local artisan shops. Shopkeepers have no data-driven way to attract nearby foot traffic, and visitors lack a single unified hub to discover shops, learn stories, and book cultural activities.
* **The Impact:**
  * **Drives Commerce:** Gamified rewards and real-time flash deals incentivize visitors to stay longer and spend more at local small businesses.
  * **Preserves Heritage:** Educates tourists by weaving cultural storytelling into every checkpoint.
  * **Personalizes Travel:** Leverages AI to craft dynamic custom itineraries on the fly.
  * **Global Accessibility:** 8-language support removes language barriers for international tourists.

---

## 🛠️ Technical Architecture & Stack

* **Frontend:** React 18, Vite, Tailwind CSS, `shadcn/ui` (Radix UI primitives), Framer Motion animations.
* **State & Query Management:** TanStack React Query for caching/polling, Lucide React icons, and Recharts for analytics visualizations.
* **Backend & BaaS (Base44):** Custom JSON entity schemas (`Shop`, `Product`, `CheckIn`, `Badge`, `FlashDeal`, `Experience`, `Booking`).
* **AI Integration:** Powered by Base44's `InvokeLLM` core for dynamic custom trail generation and the multilingual chatbot assistant.
* **Localized Architecture:** Multi-role access (Visitor guest-identity via `localStorage`, Admin/Shopkeeper session auth) and custom context providers (`AuthContext`, `LanguageContext`, `FestivalContext`).

---

## 🚀 Built For

Built using **AI and Prompt Engineering** (Base44 / Claude) for the **TKS Vibe Coding Challenge 2026**.
