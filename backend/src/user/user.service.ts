import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../dbModels/user.model';
import { UserDTO } from '../DTO/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getOneByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    if (user) return user;
    throw new BadRequestException('no such user');
  }

  async getAll(limit: number = 10, offset: number = 0) {
    const allUsersCount = await this.userRepository.count();
    const users = await this.userRepository.findAll({
      include: { all: true },
      offset,
      limit,
    });
    return { users, pages: Math.ceil(allUsersCount / limit) };
  }

  async create(user: UserDTO) {
    try {
      return await this.userRepository.create({
        login: user.login,
        password: bcrypt.hashSync(user.password, 5),
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
