import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import fs from 'node:fs';

const multerOptions = diskStorage({
  destination(req, file, callback) {
    //check if the uploads directory exists, if not create it

    const dir = './uploads';

    console.log('Checking if uploads directory exists...');
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

//set this global for the entire app to use the same multer configuration
@Global()
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
  exports: [MulterModule],
})
export class FileUploadModule {}
