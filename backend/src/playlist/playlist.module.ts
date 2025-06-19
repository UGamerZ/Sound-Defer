import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from '../dbModels/playlist.model';
import { UserModule } from '../user/user.module';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [PlaylistService],
  controllers: [PlaylistController],
  imports: [SequelizeModule.forFeature([Playlist]), UserModule, TrackModule],
})
export class PlaylistModule {}
