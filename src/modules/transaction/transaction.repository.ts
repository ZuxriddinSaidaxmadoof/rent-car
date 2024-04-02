import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { TransactionEntity } from './entities/transaction.entity';


export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity) private repository: Repository<TransactionEntity>,
  ) {}
  async create(entity: TransactionEntity): Promise<TransactionEntity> {
    return await this.repository.save(entity)
  }

  async findAll(): Promise<TransactionEntity[] | []> {
    return await this.repository.find();
  }

  async findOneById(id: ID): Promise<TransactionEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async remove(entity: TransactionEntity): Promise<TransactionEntity | undefined> {
    return await this.repository.remove(entity)
  }

  async update(newEntity: TransactionEntity, id: number): Promise<TransactionEntity | undefined> {
     const data = await this.repository.update(id, newEntity)
     return data.raw;
  }
}
