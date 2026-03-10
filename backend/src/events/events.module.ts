import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { RegistrationProcessor } from './registration.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'event-registrations',
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService, RegistrationProcessor],
})
export class EventsModule {}
