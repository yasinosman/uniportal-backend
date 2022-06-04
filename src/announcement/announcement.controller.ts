import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto, USER_ROLE } from './dto';

@Controller('announcements')
export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  @Get('/')
  getAll() {
    return this.announcementService.getAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(USER_ROLE.LECTURER)
  create(@Body(new ValidationPipe()) dto: CreateAnnouncementDto) {
    return this.announcementService.create(dto);
  }
}
