import { Event } from '../entities/event.entity';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Next.js Advanced Workshop',
    date: '2026-04-15T18:00:00.000Z',
    location: 'Kyiv, Ukraine',
    shortDescription:
      'Hands-on workshop on building production-ready Next.js applications.',
    description:
      'A deep dive into Next.js with a focus on architecture, performance, and working with APIs. We will walk through real-world examples of building event modules, SEO optimization, caching strategies, and deployment.',
  },
  {
    id: '2',
    title: 'NestJS for Production APIs',
    date: '2026-04-20T17:30:00.000Z',
    location: 'Lviv, Ukraine',
    shortDescription: 'How to build scalable REST APIs with NestJS.',
    description:
      'An event for developers who want a systematic approach to building backends with NestJS. We will cover modular architecture, validation, error handling, queues, and integration with frontend applications.',
  },
  {
    id: '3',
    title: 'Fullstack TypeScript Meetup',
    date: '2026-05-05T16:00:00.000Z',
    location: 'Online',
    shortDescription:
      'Meetup about best TypeScript practices on frontend and backend.',
    description:
      'We discuss practical approaches to typing in real-world projects: shared types between frontend and backend, DTOs, API contracts, data validation, and avoiding duplicated logic.',
  },
  {
    id: '4',
    title: 'Event-Driven Architectures with Queues',
    date: '2026-05-12T19:00:00.000Z',
    location: 'Warsaw, Poland',
    shortDescription:
      'Practical introduction to event-driven systems using queues.',
    description:
      'We will explore how to build reliable asynchronous systems using queues, retries, and dead-letter queues. Examples with Bull/BullMQ, Redis, and NestJS-based services.',
  },
  {
    id: '5',
    title: 'Practical UI/UX for Developers',
    date: '2026-05-25T15:00:00.000Z',
    location: 'Online',
    shortDescription:
      'How developers can create clean interfaces without a dedicated designer.',
    description:
      'This event focuses on simple, clean, and logical UI principles: typography, spacing, layout grids, responsiveness, and accessibility. All examples are based on Tailwind CSS and Next.js.',
  },
];
