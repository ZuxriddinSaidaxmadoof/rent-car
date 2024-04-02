import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  owner: number;

  @Column({ type: 'integer', nullable: false })
  logo: number;

  @OneToMany(() => UserEntity, (user) => user.company)
  @JoinColumn({name: "owners"})
  owners: UserEntity[];
  
  @ManyToOne(() => FileEntity, (photo) => photo.company)
  @JoinColumn({name: "logo"})
  image: FileEntity;

  @OneToMany(() => ModelEntity, (model) => model.companies)
  @JoinColumn({name: "models"})
  models: ModelEntity[]

}
