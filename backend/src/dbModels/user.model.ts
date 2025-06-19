import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Playlist } from './playlist.model';
import { UserPlaylist } from './user-playlist.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { Track } from './track.model';

@Table
export class User extends Model {
  @Column({ allowNull: false, unique: true })
  declare login: string;

  @Column({ allowNull: false })
  declare password: string;

  @HasMany(() => Track)
  declare tracks: Track[];

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];

  @HasMany(() => Playlist)
  declare createdPlaylists: Playlist[];

  @BelongsToMany(() => Playlist, () => UserPlaylist)
  declare savedPlaylists: Playlist[];
}
