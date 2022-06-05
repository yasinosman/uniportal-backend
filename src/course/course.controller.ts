import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { USER_ROLE } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { CourseService } from './course.service';

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
}
