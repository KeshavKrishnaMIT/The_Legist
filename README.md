# Legist

Legist is a legal-tech platform that connects clients with verified lawyers,
letting clients file a case and track it from filing to resolution, and
letting lawyers review, accept, and manage incoming case requests.

## Overview

The platform is built around two user roles:

- **Client** — files a case, searches the lawyer directory, and tracks a
  case through to resolution.
- **Lawyer** — reviews incoming case requests, accepts the ones they can
  take on, and manages an active docket.

This is currently a frontend prototype. All data (lawyers, clients, cases)
is mock data generated for demonstration purposes. A backend scaffold
exists but is not yet connected to the frontend.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| UI | React 19 | Function components and hooks only |
| Build tool | Vite 7 | `npm run dev` for local development, `npm run build` for production |
| Routing | React Router 7 | Routes are centralized in `router/APPRoutes.jsx` |
| Styling | Plain CSS with custom properties | No CSS framework; design tokens are defined once in `index.css` |
| State management | React `useState` / `useMemo` | No external state management library |
| Persistence | `localStorage` | Used only to store the signed-in user's display name |
| Backend | Express and Mongoose | Scaffolded under `server/`; routes and models are currently empty stub files and are not called by the frontend |
| Fonts | Fraunces, Inter, IBM Plex Mono | Serif for headings, sans-serif for body text, monospace for labels and case numbers |

## Design System

The interface uses a dark ink-navy background with brass/gold accents,
intended to evoke a legal document rather than a typical dashboard.

| Token | Value | Used for |
|---|---|---|
| `--ink` | `#0A0E17` | Base page background |
| `--ink-soft` | `#11172A` | Cards and panels |
| `--parchment` | `#F3ECDC` | Headings |
| `--brass` / `--brass-bright` | `#C9A24B` / `#E8C873` | Buttons, active states, accents |
| `--seal-red` | `#A23B33` | Live indicators and alerts |
| `--mist` | `#8C97AE` | Secondary and muted text |

Shared utility classes (`.container`, `.btn`, `.eyebrow`, `.section-head`)
are defined once in `index.css` and reused across every page. A shared
`useReveal` hook and `<Reveal>` component provide scroll-triggered fade-in
animations used throughout the app.

## Route Map

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero section, legal news dispatch, FAQ accordion, about preview |
| `/select-role` | Select Role | Lets a new user choose the Client or Lawyer path |
| `/sign-in` | Sign In | Name, 10-digit mobile number, and password form; stores the session name in `localStorage` |
| `/about` | About | Platform mission, guiding principles, and team |
| `/blog` | Blogs | Legal news dispatch as a standalone page |
| `/client/new-case` | New Case | Case intake form that filters the lawyer directory by case type and location |
| `/client/search-lawyer` | Search Lawyer | Directory search across the full lawyer dataset |
| `/client/case` | Client Case | Case workspace with a progress timeline and a chat panel |
| `/lawyer/dashboard` | Lawyer Dashboard | Summary statistics and an entry point into the case queue |
| `/lawyer/cases` | Lawyer Cases | Full case queue with search, status filters, and case acceptance |
| `*` | Not Found | 404 page with links back to Home and New Case |

## Folder Structure

```
DevSprint/
  client/
    index.html
    src/
      index.css
      hooks/
        useReveal.js
      components/
        Reveal/
        Navbar/
        CaseTimeline/
      mock/
        lawyers.js
      data/
        clients.js
        cases.js
        legalNews.js
        mockCase.js
      router/
        APPRoutes.jsx
      pages/
        Home/
        Auth/SignIn
        SelectRole/
        About/
        Blogs/
        Client/ (NewCase, SearchLawyer)
        ClientCase/
        Lawyer/ (Cases)
        LawyerDashboard/
        NotFound.jsx
  server/
    src/
      index.js
      models/
      routes/
      config/
```

## Getting Started

Install and run the client:

```
cd DevSprint/client
npm install
npm run dev
```

This starts the development server, typically at `http://localhost:5173`.

Optionally, install and run the backend scaffold:

```
cd DevSprint/server
npm install
npm start
```

This starts an Express server at `http://localhost:5000`. It currently only
responds with a plain status message and is not called by the frontend.

No environment variables are required to run the frontend, since it
currently uses local mock data rather than a live API.

## Mock Data

Three data files provide the demo content for the app:

| File | Records | Contents |
|---|---|---|
| `mock/lawyers.js` | 300 | Name, specialization, city, fee, experience, rating, phone, photo |
| `data/clients.js` | 250 | Name, phone, city, email, join date |
| `data/cases.js` | 400 | Title, case type, description, linked client, linked lawyer (or unassigned), status, filed date, next hearing date, document |

The data covers 20 Indian cities and 15 practice areas. Lawyers and cases
are cross-checked so that any case assigned to a lawyer always matches that
lawyer's specialization. On average there are about 1.5 lawyers per
specialization-and-city combination, which is why Search Lawyer and New
Case return small, focused result sets without needing pagination. Lawyer
Cases, which lists all 400 cases rather than a filtered subset, includes
search, status filtering, and pagination for that reason.

Case statuses used across the dataset: Request Sent, Under Review,
Accepted, Evidence Submission, Arguments, Awaiting Hearing, Judgement
Reserved, Closed. 75 of the 400 cases are intentionally left unassigned to
a lawyer, to reflect a realistic backlog rather than a fully staffed queue.

## Known Limitations

- The backend is scaffolded but not implemented; no API calls are made
  from the frontend, and all data is local mock data.
- Sign In only validates field format (name present, 10-digit mobile,
  password present); there is no real authentication or password check.
- Chat messages and timeline milestones added during a session are not
  persisted and reset on page refresh.
- Client Case always displays a single fixed demo case rather than the
  specific case a client filed or selected.
- Lawyer Dashboard's summary statistics (open requests, active cases,
  average response time) are static placeholder values, not computed from
  the case data.

## Suggested Next Steps

- Connect the Express and Mongoose backend to real endpoints for lawyers,
  clients, and cases, replacing the static mock imports.
- Route Client Case by an actual case identifier so it reflects the
  specific case a client filed.
- Compute Lawyer Dashboard statistics from the live case data.
- Replace `localStorage`-based sign-in with real authentication once the
  backend is connected.
- Persist chat messages and added timeline milestones per case.
