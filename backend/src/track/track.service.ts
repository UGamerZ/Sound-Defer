import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from '../dbModels/track.model';
import { TrackDTO } from '../DTO/track';
import { UserDTO } from '../DTO/user';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import { FileType } from '../DTO/filetypes';
import { Op } from 'sequelize';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackRepository: typeof Track,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async getAll(limit: number = 10, offset: number = 0) {
    const allTracksAmount = await this.trackRepository.count();
    const tracks = await this.trackRepository.findAll({
      include: { all: true },
      offset,
      limit,
    });
    return { tracks, pages: Math.ceil(allTracksAmount / limit) };
  }

  async getBySearch(query: string) {
    return await this.trackRepository.findAll({
      where: { name: { [Op.substring]: query } },
      include: { all: true },
    });
  }

  async addListen(id: number) {
    const track = await this.getByID(id);
    if (track) {
      track.increment('listens');
      return 'listen added';
    }
    throw new BadRequestException('no such track');
  }

  async create(
    data: TrackDTO,
    userData: UserDTO,
    files: { cover?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    try {
      const audio = this.fileService.createFile(FileType.AUDIO, files.audio);
      const cover = this.fileService.createFile(FileType.COVER, files.cover);
      const track = await this.trackRepository.create({
        ...data,
        audio,
        cover,
      });
      const user = await this.userService.getOneByLogin(userData.login);
      await track.$set('author', user);
      return 'track created';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getByID(id: number) {
    return await this.trackRepository.findOne({ where: { id } });
  }
}
