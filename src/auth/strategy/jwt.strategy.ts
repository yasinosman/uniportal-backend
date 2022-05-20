import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConstantsService } from 'src/constants/constants.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  ConstantsService.JWT_STRATEGY_NAME,
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: { sub: number; email: string; iat: number; exp: number }) {
    return { id: payload.sub, email: payload.email };
  }
}
