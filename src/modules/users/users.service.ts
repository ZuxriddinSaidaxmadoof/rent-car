import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { FileService } from '../file/file.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor( private readonly repository: UserRepository,
    @Inject("iFileService") private readonly fileService: FileService 
    ){}
  async create(createUserDto: CreateUserDto) {
    const checkPhone = await this.repository.findOneByPhone(createUserDto.phone);
    if(checkPhone){
      throw new BadRequestException("This phone already exist")
    }
    await this.fileService.findOne(createUserDto.avatar);
    const entity = new UserEntity();
    entity.fullName = createUserDto.fullName;
    entity.phone = createUserDto.phone;
    entity.password = createUserDto.password;
    entity.role = createUserDto.role;
    entity.avatar = createUserDto.avatar; 

    const createdUser = await this.repository.create(entity);
    return new ResData("User created", 201, createdUser);
  }

  async findAll() {
      const foundData = await this.repository.findAll();
      
      return new ResData('All users', 200, foundData);
  }

  async findOne(id: number) {
    const foundData = await this.repository.findOneById(id);

    if (!foundData) {
      throw new NotFoundException("User not found by id");
    }

    return new ResData('success', 200, foundData);
  }

  async findOneByPhone(phone: number) {
    const foundData = await this.repository.findOneByPhone(phone)

    if (!foundData) {
      throw new NotFoundException("User not found by phone");
    }

    return new ResData('success', 200, foundData);
  }

  async update(id: number, UpdateUserDto: CreateUserDto) {
    const {data: oldUser} = await this.findOne(id);
    const newEntity = Object.assign(oldUser, UpdateUserDto)
    const updated = await this.repository.update(newEntity, id)
    return new ResData("User updated successfully", 200, updated);
  }

  async remove(id: number) {
    const { data: entity } = await this.findOne(id)
    const data = await this.repository.remove(entity)
    return new ResData("User deleted successfully", 200, entity);
  }
}
