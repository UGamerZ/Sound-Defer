import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDTO } from '../DTO/track';
import { RequestAuth } from '../DTO/request';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/public.decorator';

@Controller('tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Public()
  @Get()
  getAllTracks(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.trackService.getAll(limit, offset);
  }

  @Public()
  @Get('search')
  getBySearch(@Query('query') search: string) {
    return this.trackService.getBySearch(search);
  }

  @Public()
  @Get('/listen/:id')
  addListenCount(@Param('id') id: number) {
    return this.trackService.addListen(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  createTrack(
    @Body() data: TrackDTO,
    @Request() req: RequestAuth,
    @UploadedFiles()
    files: { cover?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    return this.trackService.create(data, req.user, files);
  }
}
