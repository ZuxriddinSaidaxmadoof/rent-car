import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { CompanyEntity } from './entities/company.entity';
import { UsersService } from '../users/users.service';

export class CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity) private repository: Repository<CompanyEntity>,
  ) {}
  async create(entity: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.save(entity)
  }

  async findAll(): Promise<CompanyEntity[] | []> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<CompanyEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<CompanyEntity | undefined> {
    return await this.repository.findOneBy({ name });
  }

  async remove(entity: CompanyEntity): Promise<CompanyEntity | undefined> {
    return await this.repository.remove(entity)
  }

  async update(newEntity: CompanyEntity, id: number): Promise<CompanyEntity | undefined> {
     const data = await this.repository.update(id, newEntity)
     return data.raw;
  }
}
