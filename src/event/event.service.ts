import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(private dbService: DbService) {}

  async getAll() {
    const events = await this.dbService.event.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        subtitle: true,
        imgURL: true,
        imgAlt: true,
      },
    });

    return events;
  }

  async getById(id: number) {
    const event = await this.dbService.event.findFirst({
      where: { id: id },
    });

    return event;
  }

  async create(dto: CreateEventDto) {
    const createdEvent = await this.dbService.event.create({
      data: { ...dto },
    });

    return createdEvent;
  }
}
