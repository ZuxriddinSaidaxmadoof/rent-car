import { BaseEntity } from 'src/common/database/base.entity';
import { StatusEnum, StatusTrack } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transaction')
export class TransactionEntity extends BaseEntity {

  @Column({name: 'company_id', type: 'integer' })
  companyId: number;

  @Column({name: 'user_id', type: 'integer' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  @JoinColumn({name: "user_data"})
  userData: UserEntity;

  @Column({name: 'car_id', type: 'integer' })
  carId: number;

  @ManyToOne(() => CarEntity, (car) => car.transactions)
  @JoinColumn({name: "car_data"})
  carData: CarEntity;

  @Column({type: 'integer', nullable: false })
  price: number;
  
  @Column({name: "start_km", type: 'integer', nullable: true })
  startKm: number;

  @Column({name: "end_km", type: 'integer',nullable: true})
  endKm: number;

  @Column({name: "start_date", type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({name: "end_date", type: 'timestamp',nullable: true })
  endDate: Date;

  @Column({type: 'enum', enum: StatusEnum, nullable: false })
  status: StatusEnum

  @Column({name: 'created_by', type: 'integer', nullable: false })
  createdBy: number;

  @Column({name: 'last_edited_by', type: 'integer', nullable: true })
  lastEditedBy: number;

  @Column({name: "started_km", type: 'integer', nullable: true })
  startedKm: number;

  @Column({name: "ended_km", type: 'integer', nullable: true })
  endedKm: number;

  @Column({type: 'enum', enum: StatusTrack, nullable: false })
  statusTrack: StatusTrack;
}
