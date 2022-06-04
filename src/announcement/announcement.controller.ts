import { Controller, Get } from '@nestjs/common';
// import { UseGuards } from '@nestjs/common';
// import { Roles } from 'src/auth/decorator/roles.decorator';
// import { USER_ROLE } from 'src/auth/dto';
// import { JwtGuard } from 'src/auth/guard';
// import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AnnouncementService } from './announcement.service';

@Controller('announcements')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get('/')
  //Use the following syntax to protect routes to lecturers only
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(USER_ROLE.LECTURER)
  getAll() {
    return this.announcementService.getAll();
  }
}
