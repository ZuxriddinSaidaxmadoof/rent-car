import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { ModelEntity } from './entities/model.entity';

export class ModelRepository {
  constructor(
    @InjectRepository(ModelEntity) private repository: Repository<ModelEntity>,
  ) {}
  async create(entity: ModelEntity): Promise<ModelEntity> {
    return await this.repository.save(entity)
  }

  async findAll(): Promise<ModelEntity[] | []> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<ModelEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findByCompanyId(id: ID): Promise<ModelEntity[] | undefined> {
    return await this.repository.findBy({companyId: id});
  }

  async findOneByName(name: string): Promise<ModelEntity | undefined> {
    return await this.repository.findOneBy({ name });
  }

  async findByNameCompanyId(name: string, companyId: number): Promise<ModelEntity[] | undefined> {
    return await this.repository.findBy({name: name, companyId: companyId});
  }

  async remove(entity: ModelEntity): Promise<ModelEntity | undefined> {
    return await this.repository.remove(entity)
  }

  async update(newEntity: ModelEntity, id: number): Promise<ModelEntity | undefined> {
     const data = await this.repository.update(id, newEntity)
     return data.raw;
  }
}
