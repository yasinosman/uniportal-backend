import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateCourseDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private dbService: DbService) {}

  async getCoursesOfLecturer(user: any) {
    return await this.dbService.course.findMany({
      where: { lecturerId: user.id },
    });
  }

  async getCoursesOfStudent(user: any) {
    const courses = await this.dbService.studentCourse.findMany({
      where: {
        studentId: user.id,
      },
    });

    if (!courses || courses?.length <= 0) {
      return [];
    }

    return await this.dbService.course.findMany({
      where: {
        id: {
          in: courses.map((c) => c.courseId),
        },
      },
    });
  }

  async getAllCourses() {
    return await this.dbService.course.findMany();
  }

  async createCourse(dto: CreateCourseDto) {
    return await this.dbService.course.create({ data: { ...dto } });
  }

  async getCourseDetailById(id: number) {
    const assignments = await this.dbService.courseAssignment.findMany({
      where: { courseId: id },
    });

    const announcements = await this.dbService.courseAnnouncement.findMany({
      where: { courseId: id },
    });

    const course = await this.dbService.course.findUnique({
      where: { id: id },
    });

    return { ...course, assignments, announcements };
  }
}
