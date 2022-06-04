import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { USER_ROLE } from 'src/auth/dto';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { CreateEventDto } from './dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('/')
  getAll() {
    return this.eventService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.eventService.getById(parseInt(id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(USER_ROLE.LECTURER, USER_ROLE.ADMIN)
  create(@Body(new ValidationPipe()) dto: CreateEventDto) {
    return this.eventService.create(dto);
  }
}
