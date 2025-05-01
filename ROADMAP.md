# 📅 4–6 Week Development Roadmap: Lending Admin Dashboard (DealTrack)

A portfolio-ready real-world admin dashboard for tracking clients, loan deals, and transactions.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js/React + TypeScript
- **Backend**: Supabase (PostgreSQL, Realtime, Auth)
- **Styling**: Tailwind CSS, shadcn UI
- **Charts**: Chart.js or Recharts (for analytics)

---

## ✅ Week 1: Setup & Core Structure

- [✅] Initialize project structure and Supabase integration
- [✅] Create Supabase tables:
  - `clients` — id, name, contact info, status
  - `deals` — id, client_id, amount, term, status, created_at
  - (Optional) `transactions` — id, deal_id, amount, type, note, timestamp
- [✅] Add row-level security (RLS) policies for all tables
- [✅] Basic layout:
  - Sidebar navigation
  - Header with logo and dark mode toggle

---

## ✅ Week 2: Clients Module (CRUD)

- [ ] Clients management page
  - List clients with relevant info
  - Modal for adding a new client
  - Edit and delete functionality
- [ ] Realtime updates using Supabase `on().subscribe()`
- [ ] Client status indicators (Active, Blacklisted, etc.)
- [ ] Add search/filter/sort functionality
- [ ] Form validation and toast notifications
- [ ] Detailed Client Profiles
  - Click a client to view a dedicated profile page (bio, history, transaction stats)

---

## ✅ Week 3: Deals Module (CRUD)

- [ ] Deals list page
  - [ ] Show all deals with linked client names
  - [ ] Add deal modal (select client, amount, term, status)
  - [ ] Edit/delete existing deals
- [ ] Business logic:
  - [ ] Compute total loan per client
  - [ ] Status labels: Pending, Approved, Rejected
- [ ] Realtime UI sync on deal creation/editing
- [ ] Empty states and loading skeletons

---

## ✅ Week 4: Dashboard & Data Visualizations

- [ ] Create analytics dashboard:
  - [ ] Total number of clients
  - [ ] Total value of all deals
  - [ ] Number of pending deals
- [ ] Add visualizations:
  - [ ] Bar chart: Clients with most deals
  - [ ] Line chart: Monthly loan activity
- [ ] Recent deals list with dates, client, and status
- [ ] Add summary cards (highlight stats)

---

## 🔐 Week 5: Auth & Admin-Only Access

- [ ] Enable Supabase Auth with email/password
- [ ] Protect all pages behind auth
- [ ] Auth guards for routes (redirect unauthenticated users)
- [ ] Implement logout and auto-expiration handling

---

## 🌟 Week 6: Polish, Extras & Deployment

- [ ] Add loading states, empty messages, and error boundaries
- [ ] Make UI fully mobile responsive
- [ ] (Optional) Add CSV export for deals/clients
- [ ] Add activity logging (admin actions)
- [ ] Test all flows and fix minor UI issues
- [ ] Deploy to Vercel or Netlify
- [ ] Write README with:
  - App summary and purpose
  - Stack used
  - Setup instructions
  - Screenshots or demo video

---

## 🏁 Final Deliverables

- [ ] Hosted Live App (protected by auth)
- [ ] GitHub Repository with clean code and README
- [ ] Loom walkthrough or GIFs/screenshots
- [ ] Resume/Portfolio link to the project

---
