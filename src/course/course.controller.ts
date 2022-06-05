import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorator';
import { USER_ROLE } from 'src/auth/dto';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(JwtGuard)
  @Get('/')
  getAll(@GetUser() user) {
    switch (user.role) {
      case USER_ROLE.ADMIN:
        return this.courseService.getAllCourses();
      case USER_ROLE.LECTURER:
        return this.courseService.getCoursesOfLecturer(user);
      case USER_ROLE.STUDENT:
        return this.courseService.getCoursesOfStudent(user);
      default:
        throw new NotFoundException(null, 'User role not found');
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Post('/')
  @Roles(USER_ROLE.ADMIN)
  create(@Body(new ValidationPipe()) dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  getDetail(@Param('id') id: string) {
    return this.courseService.getCourseDetailById(parseInt(id));
  }

  // @UseGuards(JwtGuard, RolesGuard)
  // @Post('/:id/assignments')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.LECTURER)
  // addAssignment(@Body(new ValidationPipe()) dto: CreateCourseDto) {}

  // @UseGuards(JwtGuard, RolesGuard)
  // @Post('/:id/announcements')
  // @Roles(USER_ROLE.ADMIN, USER_ROLE.LECTURER)
  // addAnnouncement(@Body(new ValidationPipe()) dto: CreateCourseDto) {}
}
