import { BaseEntity } from 'src/common/database/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', nullable: false })
  minetype: string;

  @Column({ type: 'int', nullable: false})
  size: number;

  @Column({type: "integer", default: null })
  car_id?: number;

  @OneToMany(() => UserEntity, (user) => user.avatar)
  user: UserEntity[]

  @OneToMany(() => CompanyEntity, (company) => company.image)
  company: CompanyEntity[]
}
