import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Playlist } from './playlist.model';
import { User } from './user.model';

@Table({ createdAt: false, updatedAt: false })
export class UserPlaylist extends Model {
  @ForeignKey(() => User)
  @Column
  declare userID: number;

  @ForeignKey(() => Playlist)
  @Column
  declare playlistID: number;
}
