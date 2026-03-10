import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { EVENTS } from './data/events.data';
import { GetEventsQueryDto } from './dto/get-events.query.dto';

export interface GetEventsResult {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class EventsService {
  getEvents(query: GetEventsQueryDto): GetEventsResult {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const search = query.search?.trim().toLowerCase();
    const dateFrom = query.dateFrom ? new Date(query.dateFrom) : null;
    const dateTo = query.dateTo ? new Date(query.dateTo) : null;

    let filtered = EVENTS;

    if (search && search.length > 0) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search),
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(
        (event) => new Date(event.date).getTime() >= dateFrom.getTime(),
      );
    }

    if (dateTo) {
      filtered = filtered.filter(
        (event) => new Date(event.date).getTime() <= dateTo.getTime(),
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const data = filtered.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
