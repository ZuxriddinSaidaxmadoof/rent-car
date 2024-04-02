import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CompanyRepository } from '../company/company.repository';
import { CreateModelDto } from './dto/create-model.dto';
import { ModelEntity } from './entities/model.entity';
import { ModelRepository } from './model.repository';

@Injectable()
export class ModelService {
  constructor(private readonly repository: ModelRepository, 
    @Inject("ICompanyRepository") private readonly companyRepository: CompanyRepository
    ){}
  async create(createModelDto: CreateModelDto) {

    const checkCompanyExist = await this.companyRepository.findOneById(createModelDto.companyId);
    if(!checkCompanyExist){
      throw new NotFoundException("Company not found")
    }

    const checkNameExist = await this.repository.findByNameCompanyId(createModelDto.name, createModelDto.companyId);
    
    if(checkNameExist[0]){
      throw new BadRequestException(`The company already has This model '${createModelDto.name}'`)
    }

    const newEntity = new ModelEntity();
    newEntity.name = createModelDto.name;
    newEntity.companyId = createModelDto.companyId;

    const created = await this.repository.create(newEntity);
    return new ResData("Model created successfully", 201, created);
  }

  async findAll() {
    const findAll = await this.repository.findAll();
    return new ResData("All models", 200, findAll);
  }

  async findOne(id: number) {
    const foundById = await this.repository.findOneById(id);
    if(!foundById){
      throw new NotFoundException("model not found by id")
    }
    return new ResData("One model by id", 200, foundById);
  }

  async findByCompanyId(id: number) {
    const foundById = await this.repository.findByCompanyId(id);

    return new ResData("models by company id", 200, foundById);
  }

  async findOneByName(name: string) {
    const foundByName = await this.repository.findOneByName(name);
    if(!foundByName){
      throw new NotFoundException("model node found by name")
    }
    return new ResData("One model by name", 200, foundByName);
  }

  async update(id: number, updateModelDto: CreateModelDto) {

    const checkCompanyExist = await this.companyRepository.findOneById(updateModelDto.companyId);
    if(!checkCompanyExist){
      throw new NotFoundException("Company not found")
    }

    const {data: foundModel} = await this.findOne(id)

    const newEntity = new ModelEntity();
    newEntity.name = updateModelDto.name;
    newEntity.companyId = updateModelDto.companyId;

    const ready = Object.assign(foundModel, newEntity);

    await this.repository.update(ready, id);
    return new ResData("Updated successfully", 200, ready);
  }

  async remove(id: number) {
    const {data: foundModel} = await this.findOne(id)

    const deleted = await this.repository.remove(foundModel);
    return new ResData("Deleted successfully", 200, deleted);
  }
}
