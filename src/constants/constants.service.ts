import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstantsService {
  static JWT_STRATEGY_NAME = 'jwt';
}
