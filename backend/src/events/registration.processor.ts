import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('event-registrations')
export class RegistrationProcessor {
  @Process('event-registration')
  handleRegistrationJob(
    job: Job<{
      eventId: string;
      fullName: string;
      email: string;
      phone: string;
    }>,
  ): void {
    const { eventId, fullName, email, phone } = job.data;

    console.log(
      `processed registration job: eventId=${eventId}, fullName=${fullName}, email=${email}, phone=${phone}, attempt=${job.attemptsMade + 1}`,
    );
  }
}
