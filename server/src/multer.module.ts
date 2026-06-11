import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fs from 'node:fs';

const multerOptions = diskStorage({
  destination(req, file, callback) {
    //check if the uploads directory exists, if not create it

    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, './uploads');
  },
  filename(req, file, callback) {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage: multerOptions,
      limits: {
        fileSize: 10 * 1024 * 1024, //10MB
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class FileUploadModule {}
