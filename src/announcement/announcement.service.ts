import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AnnouncementService {
  constructor(private dbService: DbService) {}

  async getAll() {
    const announcements = await this.dbService.announcement.findMany();

    return announcements;
  }
}
