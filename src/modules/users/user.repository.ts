import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}
  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(entity)
  }

  async findAll(): Promise<UserEntity[] | []> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByPhone(phone: number): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ phone });
  }

  async remove(entity: UserEntity): Promise<UserEntity | undefined> {
    return await this.repository.remove(entity)
  }

  async update(newEntity: UserEntity, id: number): Promise<UserEntity | undefined> {
     const data = await this.repository.update(id, newEntity)
     return data.raw;
  }
}
