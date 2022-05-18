import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupRequestDto } from './dto';
import { hash } from 'argon2';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private dbService: DbService) {}

  async signup(dto: SignupRequestDto) {
    try {
      const hashedPassword = await hash(dto.password);

      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      delete user.hash;

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email already exists');
      }

      throw error;
    }
  }

  signin() {
    return { msg: 'Signin' };
  }
}
