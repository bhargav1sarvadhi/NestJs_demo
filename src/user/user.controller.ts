import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { createUserSchema } from 'src/validation-schemas/user.validation-schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @HttpCode(201)
  async createuser(@Body() data, @Res() res) {
    const user = await this.userService.createuser(data);
    return res
      .status(201)
      .json({ sucess: true, message: 'User created successfully' });
  }

  @Get()
  @HttpCode(200)
  async getuser(@Res() res) {
    const user = await this.userService.getusers();
    return res
      .status(200)
      .json({ sucess: true, message: 'User Finded successfully', data: user });
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteuser(@Param('id') id, @Res() res) {
    const deleteuser = await this.userService.deleteuser(id);
    return res.json({ sucess: true, message: 'User deleted sucessfully' });
  }
}
