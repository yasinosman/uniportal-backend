import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ConstantsService } from 'src/constants/constants.service';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard(ConstantsService.JWT_STRATEGY_NAME))
  @Get('/me')
  getMe(@Req() req: Request) {
    return { user: req.user };
  }
}
