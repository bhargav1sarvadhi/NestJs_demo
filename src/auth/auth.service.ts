import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/user/user. entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(users)
    private userSevices: Repository<users>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email, password) {
    const user = await this.userSevices.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new NotFoundException('User Not Found Please Check Details');
  }

  async createtoken(user) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
