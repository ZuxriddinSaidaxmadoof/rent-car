import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]),
  MulterModule.register({
    storage: diskStorage({
      destination: (req,file,cb) => {
        const path = "upload";
        if(!existsSync(path)){
          mkdirSync(path)
        }
        cb(null, path)
      },
      filename: (req, file, cb): void =>{
        const fileName = file.filename + "." + Math.random() + "." + file.originalname;          
        cb(null, fileName)
      }
    })
  }),
  SharedModule
],
  controllers: [FileController],
  providers: [FileService],
  // exports: [FileService]
})
export class FileModule {}
