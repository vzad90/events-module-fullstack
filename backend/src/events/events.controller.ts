import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import type { GetEventsResult } from './events.service';
import { GetEventsQueryDto } from './dto/get-events.query.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(@Query() query: GetEventsQueryDto): GetEventsResult {
    return this.eventsService.getEvents(query);
  }
}
