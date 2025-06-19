import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../dbModels/user.model';
import { UserDTO } from '../DTO/user';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.userService.getOneByLogin(login);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      login: user.dataValues.login,
      sub: user.dataValues.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: UserDTO) {
    const role = await this.roleService.getRoleByName('User');
    if (role) {
      const newUser = await this.userService.create(user);
      await newUser.$set('roles', role);
      return 'artists registered';
    } else throw new BadRequestException('no such role');
  }
}
