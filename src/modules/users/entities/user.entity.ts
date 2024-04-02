import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: false })
  fullName: string;

  @Column({ type: 'integer', unique: true, nullable: false })
  phone: number;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'integer', nullable: false })
  avatar: number;
  
  @Column({ name: "company_id", type: 'integer', nullable: true })
  companyId: number

  @ManyToOne(() => FileEntity, (photo) => photo.user)
  @JoinColumn({name: "file_id"})
  file: FileEntity;

  @Column({ type: 'text', nullable: false })
  role: RoleEnum;

  @ManyToOne(() => CompanyEntity,
  (company) => company.owners
  )
  company: CompanyEntity;

  @OneToMany(() => TransactionEntity, (transaction) => {
    transaction.userData
  })
  transactions: TransactionEntity[];


  

  // @OneToMany(
  //   () => TransactionEntity,
  //   (transactionEntity) => transactionEntity.userData,
  // )
  // transactions: Array<TransactionEntity>;
}
