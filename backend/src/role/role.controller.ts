import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from '../DTO/role';
import { UserDTO } from '../DTO/user';
import { Roles } from '../auth/roles-auth.decorator';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Roles('Admin')
  @Post()
  createRole(@Body() role: RoleDTO) {
    return this.roleService.createRole(role);
  }

  @Roles('Admin')
  @Post('/:name/assign')
  assignRole(@Param('name') name: string, @Body() user: UserDTO) {
    return this.roleService.assignRole(name, user);
  }

  @Roles('Admin')
  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }
}
