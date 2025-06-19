import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { RequestAuth } from '../DTO/request';
import { UserDTO } from '../DTO/user';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req: RequestAuth) {
    return this.authService.login(req.user);
  }

  @Get('validate')
  async validate() {
    return 'validated';
  }

  @Public()
  @Post('register')
  createUser(@Body() userData: UserDTO) {
    return this.authService.register(userData);
  }
}
