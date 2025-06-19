import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

@Table({ createdAt: false, updatedAt: false })
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  declare userID: number;

  @ForeignKey(() => Role)
  @Column
  declare roleID: number;
}
