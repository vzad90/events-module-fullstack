# Events Module – Backend + Frontend

Fullstack events module consisting of a **NestJS backend** and a **Next.js frontend**.
It allows users to browse upcoming events, view event details, and register for events via a simple UI.

---

## Repository structure

```text
.
├─ backend/   # NestJS API (events, registrations, queue)
└─ frontend/  # Next.js + TypeScript + Tailwind UI
```

---

## Requirements

- Node.js 20+
- npm (or a compatible package manager)
- Redis (for the Bull queue used by the backend)

---

## Backend

**Stack**

- NestJS (REST API)
- TypeScript
- Bull + Redis for async registrations
- class-validator / class-transformer
- Swagger (OpenAPI) docs

**Endpoints**

- `GET /events`
  - Pagination and filters: `page`, `limit`, `search`, `dateFrom`, `dateTo`
  - Response: `{ data, total, page, limit, totalPages }`
- `GET /events/:id`
  - Returns full event details or `404` if not found.
- `POST /events/:id/register`
  - Body: `{ fullName, email, phone }`
  - Validates input and enqueues a job in the `event-registrations` Bull queue.
  - The `RegistrationProcessor` currently logs processed registrations to the console.


```bash
cd backend
npm install
npm run start:dev
```

---

## Frontend

**Stack**

- Next.js (App Router)
- TypeScript
- Tailwind CSS

**Key routes**

- `/events`
  - Lists events with pagination.
  - Shows `title`, `date`, `location`, `shortDescription`.
  - Filters:
    - search by title,
    - date range (`From` / `To`).
  - Handles `loading`, `empty`, and `error` states.

- `/events/[id]`
  - Event details page with breadcrumb.
  - Displays full event information.
  - Includes a `Register` button that opens a registration modal.


```bash
cd frontend
npm install
cp .env.local
npm run dev
```
---


