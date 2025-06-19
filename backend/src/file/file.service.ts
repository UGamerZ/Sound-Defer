import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'node:path';
import { FileType } from '../DTO/filetypes';

@Injectable()
export class FileService {
  createFile(type: FileType, file?: Express.Multer.File[]) {
    if (file) {
      const fileExt = file[0].originalname.split('.').pop();
      const fileName = type + Date.now() + '.' + fileExt;
      const filePath = path.join(__dirname, '..', '..', 'static', type + 's');
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(path.resolve(filePath, fileName), file[0].buffer);
      return fileName;
    }
    throw new BadRequestException('no file supplied');
  }
}
