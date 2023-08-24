import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';
import { createUserSchema } from 'src/validation-schemas/user.validation-schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './user.dto';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({ destination: './uploads' }),
    }),
  )
  @HttpCode(201)
  async createuser(
    @Body(new JoiValidationPipe(createUserSchema)) CreateUserDto: CreateUserDto,
    @Res() res,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    req.body.image = file.filename;
    const user = await this.userService.createuser(req.body);
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
