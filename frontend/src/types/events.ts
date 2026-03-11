export interface EventListItem {
  id: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
}

export interface EventDetail extends EventListItem {
  description: string;
}

export interface PaginatedEventsResponse<T = EventListItem> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
}

export interface ApiErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

