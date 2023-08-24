import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
