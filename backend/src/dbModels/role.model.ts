import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './user-role.model';

@Table
export class Role extends Model {
  @Column({ allowNull: false })
  declare role: string;

  @BelongsToMany(() => User, () => UserRole)
  declare users: User[];
}
