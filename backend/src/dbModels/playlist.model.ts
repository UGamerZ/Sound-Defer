import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Track } from './track.model';
import { TrackPlaylist } from './track-playlist.model';
import { User } from './user.model';
import { UserPlaylist } from './user-playlist.model';

@Table
export class Playlist extends Model {
  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column
  declare cover: string;

  @Column({ defaultValue: false })
  declare isAlbum: boolean;

  @ForeignKey(() => User)
  @Column
  declare authorID: number;

  @BelongsTo(() => User)
  declare author: User;

  @BelongsToMany(() => Track, () => TrackPlaylist)
  declare tracks: Track[];

  @BelongsToMany(() => User, () => UserPlaylist)
  declare users: User[];
}
