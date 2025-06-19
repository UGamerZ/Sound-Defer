import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../dbModels/role.model';
import { RoleDTO } from '../DTO/role';
import { UserDTO } from '../DTO/user';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    private userService: UserService,
  ) {}

  async getRoleByName(role: string) {
    return await this.roleRepository.findOne({ where: { role } });
  }

  async createRole(role: RoleDTO) {
    try {
      await this.roleRepository.create({ ...role });
      return 'role created';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getRoles() {
    return await this.roleRepository.findAll({ include: { all: true } });
  }

  async assignRole(roleName: string, data: UserDTO) {
    const user = await this.userService.getOneByLogin(data.login);
    const role = await this.getRoleByName(roleName);
    if (user && role) {
      await user.$add('roles', role);
      return 'role assigned';
    }
    throw new BadRequestException('artists or role invalid');
  }
}
