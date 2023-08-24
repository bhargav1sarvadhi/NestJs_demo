import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Req() req, @Res() res) {
    const {
      body: { email, password },
    } = req;
    const user = await this.authService.validateUser(email, password);
    if (user) {
      const token = await this.authService.createtoken(user);
      res
        .status(200)
        .json({ sucess: true, token, message: 'Sucessfully Login User' });
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getprofile(@Req() req) {
    return req.user;
  }
}
