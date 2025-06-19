import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from '../dbModels/track.model';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { User } from '../dbModels/user.model';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [SequelizeModule.forFeature([Track]), UserModule, FileModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
