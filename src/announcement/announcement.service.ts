import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAnnouncementDto } from './dto';

@Injectable()
export class AnnouncementService {
  constructor(private dbService: DbService) {}

  async getAll() {
    const announcements = await this.dbService.announcement.findMany({
      select: {
        id: true,
        createdAt: true,
        title: true,
        subtitle: true,
        imgURL: true,
        imgAlt: true,
      },
    });

    return announcements;
  }

  async getById(id: number) {
    const announcement = await this.dbService.announcement.findFirst({
      where: { id: id },
    });

    return announcement;
  }

  async create(dto: CreateAnnouncementDto) {
    const createdAnnouncement = await this.dbService.announcement.create({
      data: { ...dto },
    });

    return createdAnnouncement;
  }
}
