# Events Module – Backend + Frontend

## Backend
- **Framework**: NestJS  
- **Language**: TypeScript  
- **Queue**: Bull + Redis (background processing)  
- **Validation**: class-validator / class-transformer  
- **Documentation**: Swagger (OpenAPI)


### Backend setup
```bash
cd backend
npm install
npm run start:dev

API URL: http://localhost:3000
Swagger docs: http://localhost:3000/api
```

## Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons/UI**: Lucide React / Headless UI

### Frontend setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
App URL: http://localhost:3000 (or 3001 if backend uses 3000)
```
## API overview
Events
 - GET /events – fetch paginated events
   - Query params: page, limit, search, dateFrom, dateTo

 - GET /events/:id – get full event details (returns 404 if missing)

Registrations
 - POST /events/:id/register – submit attendee data
Payload:
```bash
{
  "fullName": "string",
  "email": "string",
  "phone": "string"
}
```
Logic: validates input and pushes a job to the event-registrations queue

## Key features
- **Async processing** – registrations are handled by RegistrationProcessor in the background.
- **Filtering** – frontend supports search by title and date range filters.
- **Responsive UI** – works well on mobile and desktop.
- **State handling** – clear loading, empty and error states.