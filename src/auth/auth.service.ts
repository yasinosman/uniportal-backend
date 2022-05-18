import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { hash, verify } from 'argon2';
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

  async signin(dto: SigninRequestDto) {
    const user = await this.dbService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      throw new ForbiddenException('Invalid email or password');
    }

    const isPasswordValid = await verify(user.hash, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid email or password');
    }

    delete user.hash;

    return user;
  }
}
