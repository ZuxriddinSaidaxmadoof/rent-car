import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('model')
export class ModelEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Column({name: 'company_id', type: 'integer', nullable: false })
  companyId: number;
  
  @ManyToOne(() => CompanyEntity, (company) => company.models)
  @JoinColumn({name: "companyId"})
  companies: CompanyEntity;

  @OneToMany(() => CarEntity, (car) => car.model)
  cars: CarEntity[]

}
