import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CompanyRepository } from '../company/company.repository';
import { ModelRepository } from '../model/model.repository';
import { CarRepository } from './car.repository';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';

@Injectable()
export class CarService {

  constructor(private readonly repository: CarRepository,
    @Inject("IModelRepository") private readonly modelRepository: ModelRepository,
    @Inject("ICompanyRepository") private readonly companyRepository: CompanyRepository,
    ){}

  async create(createCarDto: CreateCarDto) {

    const checkModel = await this.modelRepository.findOneById(createCarDto.modelId);
    if(!checkModel){
      throw new NotFoundException("Model not found")
    }

    const checkCompany = await this.companyRepository.findOneById(createCarDto.companyId);
    
    if(!checkCompany){
      throw new NotFoundException("Company not found")
    }

    const newEntity = new CarEntity();
    newEntity.name = createCarDto.name;
    newEntity.modelId = createCarDto.modelId;
    newEntity.companyId = createCarDto.companyId;
    newEntity.info = createCarDto.info;
    newEntity.price = createCarDto.price;

    const created = await this.repository.create(newEntity);
    return new ResData("Car created successfully", 201, created);
  }

  async findAll() {
    const findAll = await this.repository.findAll();
    return new ResData("All cars", 200, findAll);
  }

  async findByCompanyId(id: number) {
    const findAll = await this.repository.findByCompanyId(id);
    return new ResData("All cars by company id", 200, findAll);
  }

  async findByModelId(id: number) {
    const findAll = await this.repository.findByModelId(id);
    return new ResData("All cars by model id", 200, findAll);
  }

  async findOne(id: number) {
    const foundById = await this.repository.findOneById(id);
    if(!foundById){
      throw new NotFoundException("car not found by id")
    }
    return new ResData("One model by id", 200, foundById);
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const {data: foundCar} = await this.findOne(id)

    const checkModel = await this.modelRepository.findOneById(updateCarDto?.modelId);
    if(!checkModel){
      throw new NotFoundException("Model not found")
    }

    const checkCompany = await this.companyRepository.findOneById(updateCarDto?.companyId);
    
    if(!checkCompany){
      throw new NotFoundException("Company not found")
    }

    const newEntity = new CarEntity();
    newEntity.name = updateCarDto.name;
    newEntity.modelId = updateCarDto.modelId || foundCar.modelId;
    newEntity.companyId = updateCarDto.companyId || foundCar.companyId;
    newEntity.info = updateCarDto.info;
    newEntity.price = updateCarDto.price;

    
    const ready = Object.assign(foundCar, newEntity);

    await this.repository.update(ready, id);
    return new ResData("Updated successfully", 200, ready);
  }

  async remove(id: number) {
    const {data: foundModel} = await this.findOne(id)

    const deleted = await this.repository.remove(foundModel);
    return new ResData("Deleted successfully", 200, deleted);
  }
}
