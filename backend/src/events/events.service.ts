import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Event } from './entities/event.entity';
import { EVENTS } from './data/events.data';
import { GetEventsQueryDto } from './dto/get-events.query.dto';
import { RegisterEventDto } from './dto/register-event.dto';
import { Registration } from './entities/registration.entity';

export interface GetEventsResult {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class EventsService {
  private readonly registrations: Registration[] = [];

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

  getEventById(id: string): Event | undefined {
    return EVENTS.find((event) => event.id === id);
  }

  registerForEvent(eventId: string, dto: RegisterEventDto): Registration {
    const event = this.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const email = dto.email.trim().toLowerCase();

    const existingRegistration = this.registrations.find(
      (registration) =>
        registration.eventId === eventId &&
        registration.email.toLowerCase() === email,
    );

    if (existingRegistration) {
      throw new ConflictException(
        'Registration for this event and email already exists',
      );
    }

    const registration: Registration = {
      id: String(this.registrations.length + 1),
      eventId,
      fullName: dto.fullName.trim(),
      email,
      phone: dto.phone.trim(),
      createdAt: new Date(),
    };

    this.registrations.push(registration);

    return registration;
  }
}
