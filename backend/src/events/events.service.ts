import { Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { EVENTS } from './data/events.data';

@Injectable()
export class EventsService {
  findAll(): Event[] {
    return EVENTS;
  }
}
