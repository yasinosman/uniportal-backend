import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninRequestDto, SignupRequestDto } from './dto';
import { hash, verify } from 'argon2';
import { DbService } from 'src/db/db.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private dbService: DbService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignupRequestDto) {
    try {
      const hashedPassword = await hash(dto.password);

      const user = await this.dbService.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken({ userId: user.id, email: user.email });
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

    return this.signToken({ userId: user.id, email: user.email });
  }

  async signToken({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
