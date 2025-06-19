import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../dbModels/role.model';
import { UserModule } from '../user/user.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
  imports: [SequelizeModule.forFeature([Role]), UserModule],
})
export class RoleModule {}
