import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAnnouncementDto } from './dto';

@Injectable()
export class AnnouncementService {
  constructor(private dbService: DbService) {}

  async getAll() {
    const announcements = await this.dbService.announcement.findMany();

    return announcements;
  }

  async create(dto: CreateAnnouncementDto) {
    const createdAnnouncement = await this.dbService.announcement.create({
      data: { ...dto },
    });

    return createdAnnouncement;
  }
}
