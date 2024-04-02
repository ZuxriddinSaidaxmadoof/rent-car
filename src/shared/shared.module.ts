import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from 'src/modules/car/car.repository';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyRepository } from 'src/modules/company/company.repository';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { FileService } from 'src/modules/file/file.service';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { ModelRepository } from 'src/modules/model/model.repository';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/user.repository';
import { UsersService } from 'src/modules/users/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, UserEntity, CompanyEntity, ModelEntity, CarEntity])],
  providers: [UsersService, UserRepository,
    {provide: "iFileService", useClass: FileService},
    {provide: "ICompanyRepository", useClass: CompanyRepository},
    {provide: "ICarRepository", useClass: CarRepository},
    {provide: "IModelRepository", useClass: ModelRepository}
  ],
  exports: [UsersService, UserRepository, 
    {provide: "iFileService", useClass: FileService},
    {provide: "ICompanyRepository", useClass: CompanyRepository},
    {provide: "ICarRepository", useClass: CarRepository},
    {provide: "IModelRepository", useClass: ModelRepository}
  ]
})
export class SharedModule {}
