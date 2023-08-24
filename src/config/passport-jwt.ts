// src/auth/jwt.strategy.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { users } from 'src/user/user. entity';
import { Repository } from 'typeorm';
const JWT_SECRET = 'dsqdghdvdhqdhj54234234798njwjdsnfkdsnfdk';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(users)
    private userrrrrepository: Repository<users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload) {
    const user = await this.userrrrrepository.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
