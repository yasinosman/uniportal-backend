import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { ApiKeyGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: SignupRequestDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body(new ValidationPipe()) dto: SigninRequestDto) {
    return this.authService.signin(dto);
  }
}
