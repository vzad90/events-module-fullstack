## Events backend (NestJS)

Backend for the events module: events listing, event details and registration with background processing via Bull/Redis.

### Stack

- NestJS (TypeScript)
- class-validator / class-transformer
- Bull + Redis (queue for registrations)
- Swagger (`@nestjs/swagger`, `swagger-ui-express`)

---

### How to run

From the `backend` directory:

npm install

npm run start:dev

---

### Redis (for Bull)

backend expects the following environment variables:

- `REDIS_HOST` (default: `localhost`)
- `REDIS_PORT` (default: `6379`)

---

### API endpoints

#### `GET /events`

Returns a paginated list of events with optional filters.

Query parameters (all optional):

- `page` — page number (number, default `1`)
- `limit` — items per page (number, default `10`, max `100`)
- `search` — search string for `title` (case-insensitive)
- `dateFrom` — ISO date, events with `date >= dateFrom`
- `dateTo` — ISO date, events with `date <= dateTo`


#### `GET /events/:id`

Returns full event details by `id`.

- `200 OK` — event found, response body is the event object.
- `404 Not Found` — event not found.

#### `POST /events/:id/register`

Registers a user for an event. On success the registration is stored in memory and a job is added to the Bull queue `event-registrations`.


Validation:

- `fullName` — required, non-empty string
- `email` — required, valid email
- `phone` — required, non-empty string

codes:

- `201 Created`:
- `400 Bad Request` — validation errors.
- `404 Not Found` — event not found.
- `409 Conflict` — registration for this `eventId + email` already exists.

---

### Swagger

- `http://localhost:3000/api-docs`

