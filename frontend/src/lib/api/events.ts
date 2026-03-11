import {
  ApiError,
  type ApiErrorResponse,
  type EventDetail,
  type EventListItem,
  type PaginatedEventsResponse,
  type RegistrationPayload,
} from "@/types/events";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? "no-store",
  });

  let body: ApiErrorResponse | unknown;

  if (!response.ok) {
    try {
      body = (await response.json()) as ApiErrorResponse;
    } catch {
      body = undefined;
    }

    const errorBody = body as ApiErrorResponse | undefined;
    const baseMessage = `Request failed with status ${response.status}`;

    const message =
      typeof errorBody?.message === "string"
        ? errorBody.message
        : Array.isArray(errorBody?.message)
        ? errorBody.message.join(", ")
        : baseMessage;

    throw new ApiError(message, response.status, body);
  }

  return (await response.json()) as T;
}

interface FetchEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export async function fetchEvents(
  params: FetchEventsParams = {},
): Promise<PaginatedEventsResponse<EventListItem>> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.dateFrom) {
    searchParams.set("dateFrom", params.dateFrom);
  }

  if (params.dateTo) {
    searchParams.set("dateTo", params.dateTo);
  }

  const queryString = searchParams.toString();
  const path = queryString ? `/events?${queryString}` : "/events";

  return requestJson<PaginatedEventsResponse<EventListItem>>(path);
}

export async function fetchEventById(id: string): Promise<EventDetail> {
  if (!id) {
    throw new Error("Event id is required");
  }

  return requestJson<EventDetail>(`/events/${encodeURIComponent(id)}`);
}

export async function registerForEvent(
  id: string,
  payload: RegistrationPayload,
): Promise<{ success: boolean; message: string }> {
  if (!id) {
    throw new Error("Event id is required");
  }

  return requestJson<{ success: boolean; message: string }>(
    `/events/${encodeURIComponent(id)}/register`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

