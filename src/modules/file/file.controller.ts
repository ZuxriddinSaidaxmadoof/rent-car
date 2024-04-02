import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileEntity } from './entities/file.entity';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags("Files")
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  
  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'), )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
    
  })
  async uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 1000000}),
        new FileTypeValidator({fileType: "image"})
      ]
    })
  ) file: Express.Multer.File) {
    const entity = new FileEntity();
    entity.url = "http://localhost:7777/" + file.filename;
    entity.minetype = file.mimetype;
    entity.size = file.size;
    return await this.fileService.create(entity);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
