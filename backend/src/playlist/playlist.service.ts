import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from '../dbModels/playlist.model';
import { PlaylistDTO } from '../DTO/playlist';
import { UserService } from '../user/user.service';
import { UserDTO } from '../DTO/user';
import { TrackService } from '../track/track.service';
import { Track } from '../dbModels/track.model';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist) private playlistRepository: typeof Playlist,
    private userService: UserService,
    private trackService: TrackService,
  ) {}

  async getAll() {
    return this.playlistRepository.findAll({ include: { all: true } });
  }

  async createPlaylist(data: PlaylistDTO, userData: UserDTO) {
    try {
      const tracks: Track[] = [];
      for (const id of data.trackIDs) {
        const track = await this.trackService.getByID(id);
        if (track) tracks.push(track);
      }
      const playlist = await this.playlistRepository.create({ ...data });
      const user = await this.userService.getOneByLogin(userData.login);
      await playlist.$set('tracks', tracks);
      await playlist.$set('users', user);
      await playlist.$set('author', user);

      return 'playlist created';
    } catch {
      throw new BadRequestException('invalid data');
    }
  }

  async createAlbum(data: PlaylistDTO, userData: UserDTO) {
    data.isAlbum = true;
    return await this.createPlaylist(data, userData);
  }
}
