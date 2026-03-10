import {
  Controller,
  Get,
  NotFoundException,
  Body,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import type { GetEventsResult } from './events.service';
import type { Event } from './entities/event.entity';
import { GetEventsQueryDto } from './dto/get-events.query.dto';
import { RegisterEventDto } from './dto/register-event.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List events with optional filters and pagination.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (defaults to 1).',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (defaults to 10).',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Case-insensitive search by title.',
  })
  @ApiQuery({
    name: 'dateFrom',
    required: false,
    type: String,
    description: 'ISO date: events with date >= dateFrom.',
  })
  @ApiQuery({
    name: 'dateTo',
    required: false,
    type: String,
    description: 'ISO date: events with date <= dateTo.',
  })
  getEvents(@Query() query: GetEventsQueryDto): GetEventsResult {
    return this.eventsService.getEvents(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns event details.' })
  @ApiNotFoundResponse({ description: 'Event not found.' })
  getEventById(@Param('id') id: string): Event {
    const event = this.eventsService.getEventById(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  @Post(':id/register')
  @ApiBody({ type: RegisterEventDto })
  @ApiOkResponse({ description: 'Registration created successfully.' })
  @ApiBadRequestResponse({ description: 'Validation error.' })
  @ApiNotFoundResponse({ description: 'Event not found.' })
  @ApiConflictResponse({
    description: 'Registration for this event and email already exists.',
  })
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
