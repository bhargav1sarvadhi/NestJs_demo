import { InjectRepository } from '@nestjs/typeorm';
import { users } from './user. entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(users)
    private userrepository: Repository<users>,
  ) {}

  async createuser(data) {
    const user = this.userrepository.create(data);
    return await this.userrepository.save(user);
  }

  async getusers() {
    return await this.userrepository.find();
  }

  async deleteuser(id) {
    return await this.userrepository.delete(id);
  }
}
