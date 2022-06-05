import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcement/announcement.module';
import { EventModule } from './event/event.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    DbModule,
    AnnouncementModule,
    EventModule,
    CourseModule,
  ],
})
export class AppModule {}
