import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './dbModels/track.model';
import { Playlist } from './dbModels/playlist.model';
import { Role } from './dbModels/role.model';
import { TrackPlaylist } from './dbModels/track-playlist.model';
import { User } from './dbModels/user.model';
import { UserPlaylist } from './dbModels/user-playlist.model';
import { UserRole } from './dbModels/user-role.model';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';

@Module({
  imports: [
    TrackModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'spotify',
      autoLoadModels: true,
      models: [
        Track,
        Playlist,
        Role,
        TrackPlaylist,
        User,
        UserPlaylist,
        UserRole,
      ],
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ConfigModule.forRoot(),
    PlaylistModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
