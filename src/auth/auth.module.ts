import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/user/user. entity';
import { JwtStrategy } from 'src/config/passport-jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
const JWT_SECRET = 'dsqdghdvdhqdhj54234234798njwjdsnfkdsnfdk';

@Module({
  imports: [
    TypeOrmModule.forFeature([users]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
