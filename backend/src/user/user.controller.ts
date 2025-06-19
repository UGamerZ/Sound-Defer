import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestAuth } from '../DTO/request';
import { Roles } from '../auth/roles-auth.decorator';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  getAllUsers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.userService.getAll(limit, offset);
  }

  @Public()
  @Get('/find/:login')
  getUser(@Param('login') login: string) {
    return this.userService.getOneByLogin(login);
  }

  @Get('profile')
  getProfile(@Request() req: RequestAuth) {
    return this.userService.getOneByLogin(req.user.login);
  }
}
