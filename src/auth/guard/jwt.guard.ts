import { AuthGuard } from '@nestjs/passport';
import { ConstantsService } from 'src/constants/constants.service';

export class JwtGuard extends AuthGuard(ConstantsService.JWT_STRATEGY_NAME) {
  constructor() {
    super();
  }
}
