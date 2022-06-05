import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const API_KEY_STRATEGY_NAME = 'api-key';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  API_KEY_STRATEGY_NAME,
) {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate = (apiKey: string, done: (error: Error, data) => any) => {
    if (this.configService.get('ADMIN_API_KEY') === apiKey) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
