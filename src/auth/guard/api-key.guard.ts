import { AuthGuard } from '@nestjs/passport';
import { API_KEY_STRATEGY_NAME } from '../strategy';

export class ApiKeyGuard extends AuthGuard(API_KEY_STRATEGY_NAME) {
  constructor() {
    super();
  }
}
