import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@GetUser() user) {
    return { user };
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  update(@GetUser() user, @Body(new ValidationPipe()) dto: UpdateUserDto) {
    return this.userService.update(user, dto);
  }
}
