# Traveller-App

Traveller-facing Vite/React application. It communicates with WanderAI-Backend through `VITE_API_BASE_URL`.


. Project Overview
What TourFlow AI Does
TourFlow AI is a dual-sided travel orchestration platform bridging individual travelers with commercial tour operators. It combines generative AI models (Google Gemini) with strict algorithmic validation to deliver hyper-tailored multi-day travel itineraries, verified real-world transport routes, live dynamic destination visuals, and automated disruption replanning.

Problem It Solves
Hallucinated Travel Logistics: Generic LLMs often hallucinate non-existent flight routes, impossible transit durations, phantom train numbers, and invalid season-destination pairings. TourFlow AI enforces strict ground-truth validation over transport hubs, geocoordinates, and real Indian transit routes.
Fragile Static Itineraries: Conventional itineraries are static PDFs that break when landslides, weather delays, or road closures occur. TourFlow AI provides real-time impact analysis, autonomous AI candidate generation, and single-click operator replanning.
Disjointed Traveler-Operator State: Traditional travel businesses rely on fragmented spreadsheets, WhatsApp chats, and disconnected booking tools. TourFlow AI uses a unified canonical data model where Traveler and Operator interfaces operate on the exact same database records in real time.
Current Prototype Scope & Key Differentiators
Featured Destinations: Manali (Himachal Pradesh), Goa, Kerala (Munnar/Alleppey), Rajasthan (Jaipur/Udaipur), Kashmir (Srinagar/Gulmarg).
Dual-Portal Synchronization: Instant bi-directional state sync between Traveler Workspace (/) and Operator Enterprise Suite (/operator/dashboard).
Interactive Multi-Day Mapping: Leaflet-powered maps featuring day-by-day route paths, pinpoint markers for hotels and activities, and transit hub links.
Dynamic Backdrop Engine: Responsive ambient video/image backdrops matching the destination and time of day.
Client-Side PDF Generation: Vector-grade, multi-page branded travel voucher and itinerary export with jsPDF.
2. User Journeys
A. Traveler Journey
[ Discover ] ──▶ [ Personalize ] ──▶ [ Plan ] ──▶ [ Explore / Compare ] ──▶ [ Price ]
      │
      ▼
   [ Book ] ──▶ [ Prepare ] ──▶ [ Operate ] ──▶ [ Assist (Concierge) ] ──▶ [ Adapt (Replan) ] ──▶ [ Complete & Review ]
Discover: Browse interactive destination showcases with dynamic backgrounds, seasonal highlights, weather advice, and curated tags.
Personalize: Input natural-language trip requirements (e.g. "4-day luxury couple trip to Manali with snow adventure and boutique stay in December").
Plan: AI parses constraints into verified dates, budget tiers, companion types, and pace, building an exact 
N
-day structured itinerary.
Explore & Compare: Review day-by-day morning, afternoon, and evening slots; swap hotels or switch transport modes (Private SUV vs. Volvo vs. Flights).
Price: Real-time cost recalculation dynamically updates per-person totals, accommodation nights, transport fares, and target budget variances.
Book: Review booking references (TF-XXXXXX) across hotels, transport operators, and activity providers.
Prepare: Export comprehensive PDF travel vouchers, review packing checklists, and check emergency contact lists.
Operate: Follow day-by-day schedule with live route maps and location coordinates.
Assist: Use the in-app Gemini AI Travel Concierge for immediate local advice, food recommendations, and packing tips.
Adapt: Receive immediate alert banners if a disruption occurs, reviewing proposed alternative activities or accommodations.
Complete & Review: Submit ratings and feedback to refine future recommendation scoring.
B. Operator Journey
[ Login ] ──▶ [ Dashboard Overview ] ──▶ [ Trip Requests Queue ] ──▶ [ Trip Workspace ]
      │
      ▼
 [ Bookings ] ──▶ [ Hotels / Resorts ] ──▶ [ Transport Fleet ] ──▶ [ Vendors ] ──▶ [ Alerts & AI Replan ] ──▶ [ AI Operations Assistant ] ──▶ [ Analytics ]
Login: Authenticate at /operator/login with role-gated operator credentials (operator@tourflow.ai / demo123).
Dashboard Overview: Monitor active trips, pipeline revenue, critical disruption alerts, vendor load, and traveler satisfaction.
Trip Requests Queue: Triage traveler requests with filters for status, destination, budget, and alert severity.
Trip Workspace: Deep-dive into any traveler's canonical itinerary to edit items, modify accommodations, or adjust pricing.
Bookings & Vouchers: Confirm or cancel vendor bookings and track payment statuses (paid, pending, refunded).
Hotels / Resorts: Manage verified inventory, price per night, room tiers, and active allotments.
Transport Fleet: Coordinate fleet logistics, drivers, vehicle capacities, and route origins/destinations.
Vendors & Compliance: Audit verified activity and transport suppliers, compliance statuses, and ratings.
Alerts & Dynamic AI Replanning: Receive disruption triggers, compute multi-variable impact analyses, generate AI-ranked alternatives, and apply one-click replanning.
AI Operations Assistant: Query operational intelligence (e.g. "Summarize high-risk trips this weekend" or "Draft an apology & rebooking notification").
Analytics: Inspect margin trends, popular destinations, traveler ratings, and operational throughput.
