import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { join } from 'path';
import { ResData } from 'src/lib/resData';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileEntity)
  private repository: Repository<FileEntity>){}


  async create(createFileDto: FileEntity): Promise<ResData<FileEntity>> {
    const entity = new FileEntity()
    const assigned = Object.assign(entity, createFileDto);
    const created = await this.repository.save(assigned);
    return new ResData("File created", 201, created);
  }

  async findAll(): Promise<ResData<FileEntity[]>> {
    const allData = await this.repository.find(); 
    return new ResData("All  files", 200, allData);
  }

  async findOne(id: number): Promise<ResData<FileEntity>> {
    const foundOne = await this.repository.findOneBy({id})
    if(!foundOne){
      throw new NotFoundException("File not found")
    }
    return new ResData<FileEntity>("Found one by id", 200, foundOne);
  }

  async remove(id: number): Promise<ResData<FileEntity>> {
    const entity = await this.findOne(id);
    const fileName = entity.data.url.split("/")
    console.log(fileName[3]);
    
    unlink(join(__dirname,"../../","upload", fileName[3]), () => {
      console.log(join(__dirname,"../../","upload", fileName[3]));
    })

    const deleted = await this.repository.remove(entity.data)
    return new ResData("File deleted Successfully", 200, deleted) 
  }
}
