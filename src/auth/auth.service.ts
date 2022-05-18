import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'Signup' };
  }

  signin() {
    return { msg: 'Signin' };
  }
}
