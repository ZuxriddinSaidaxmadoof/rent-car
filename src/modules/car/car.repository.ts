import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { CarEntity } from './entities/car.entity';


export class CarRepository {
  constructor(
    @InjectRepository(CarEntity) private repository: Repository<CarEntity>,
  ) {}
  async create(entity: CarEntity): Promise<CarEntity> {
    return await this.repository.save(entity)
  }

  async findAll(): Promise<CarEntity[] | []> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<CarEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findByCompanyId(id: ID): Promise<CarEntity[] | undefined> {
    return await this.repository.findBy({companyId: id});
  }

  async findByModelId(id: ID): Promise<CarEntity[] | undefined> {
    return await this.repository.findBy({modelId: id});
  }

  async findOneByName(name: string): Promise<CarEntity | undefined> {
    return await this.repository.findOneBy({ name });
  }

  async remove(entity: CarEntity): Promise<CarEntity | undefined> {
    return await this.repository.remove(entity)
  }

  async update(newEntity: CarEntity, id: number): Promise<CarEntity | undefined> {
     const data = await this.repository.update(id, newEntity)
     return data.raw;
  }
}
