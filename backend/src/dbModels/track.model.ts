import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Playlist } from './playlist.model';
import { TrackPlaylist } from './track-playlist.model';
import { User } from './user.model';

@Table
export class Track extends Model {
  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare genre: string;

  @Column
  declare cover: string;

  @Column
  declare audio: string;

  @Column({ defaultValue: 0 })
  declare listens: number;

  @ForeignKey(() => User)
  @Column
  declare authorID: number;

  @BelongsTo(() => User)
  declare author: User;

  @BelongsToMany(() => Playlist, () => TrackPlaylist)
  declare playlists: Playlist[];
}
