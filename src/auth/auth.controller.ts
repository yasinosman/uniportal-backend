import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(new ValidationPipe()) dto: SignupRequestDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body(new ValidationPipe()) dto: SigninRequestDto) {
    return this.authService.signin(dto);
  }
}
