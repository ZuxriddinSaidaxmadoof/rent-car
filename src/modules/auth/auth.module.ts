import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
