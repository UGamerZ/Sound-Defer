import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Track } from './track.model';
import { Playlist } from './playlist.model';

@Table({ createdAt: false, updatedAt: false })
export class TrackPlaylist extends Model {
  @ForeignKey(() => Track)
  @Column
  declare trackID: number;

  @ForeignKey(() => Playlist)
  @Column
  declare playlistID: number;
}
