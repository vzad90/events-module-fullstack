import {
  Controller,
  Get,
  NotFoundException,
  Body,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import type { GetEventsResult } from './events.service';
import type { Event } from './entities/event.entity';
import { GetEventsQueryDto } from './dto/get-events.query.dto';
import { RegisterEventDto } from './dto/register-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(@Query() query: GetEventsQueryDto): GetEventsResult {
    return this.eventsService.getEvents(query);
  }

  @Get(':id')
  getEventById(@Param('id') id: string): Event {
    const event = this.eventsService.getEventById(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  @Post(':id/register')
  registerForEvent(
    @Param('id') id: string,
    @Body() dto: RegisterEventDto,
  ): { success: boolean; message: string } {
    this.eventsService.registerForEvent(id, dto);

    return {
      success: true,
      message: 'Registration successful',
    };
  }
}
