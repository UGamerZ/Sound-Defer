import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PlaylistDTO } from '../DTO/playlist';
import { PlaylistService } from './playlist.service';
import { RequestAuth } from '../DTO/request';
import { Roles } from '../auth/roles-auth.decorator';

@Controller('playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post('/create')
  create(@Body() playlist: PlaylistDTO, @Request() req: RequestAuth) {
    return this.playlistService.createPlaylist(playlist, req.user);
  }

  @Roles('Artist')
  @Post('/createAlbum')
  createAlbum(@Body() playlist: PlaylistDTO, @Request() req: RequestAuth) {
    return this.playlistService.createAlbum(playlist, req.user);
  }

  @Get()
  getAll() {
    return this.playlistService.getAll();
  }
}
