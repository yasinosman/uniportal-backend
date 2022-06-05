import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyStrategy, JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
