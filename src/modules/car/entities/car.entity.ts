import { BaseEntity } from 'src/common/database/base.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('car')
export class CarEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Column({name: 'model_id', type: 'integer', nullable: false })
  modelId: number;

  @Column({name: 'company_id', type: 'integer', nullable: false })
  companyId: number;

  @Column({type: 'json', nullable: true})
  info: Object;

  @Column({type: 'integer', nullable: false })
  price: number;
  
  @ManyToOne(() => ModelEntity, (model) => model.cars)
  model: ModelEntity;

  @OneToMany(() => TransactionEntity, (transaction) => {
    transaction.carData
  })
  transactions: TransactionEntity[]

}
