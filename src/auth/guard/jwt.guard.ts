import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY_NAME } from '../strategy';

export class JwtGuard extends AuthGuard(JWT_STRATEGY_NAME) {
  constructor() {
    super();
  }
}
