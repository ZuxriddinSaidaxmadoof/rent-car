import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository){}


  async create(createCompanyDto: CreateCompanyDto) {
    const checkNameExist = await this.repository.findOneByName(createCompanyDto.name)
    if(checkNameExist){
      throw new BadRequestException("This name already exist")
    }

    const newEntity = new CompanyEntity();
    newEntity.name = createCompanyDto.name;
    newEntity.owner = createCompanyDto.owner;
    newEntity.logo = createCompanyDto.logo;

    const created = await this.repository.create(newEntity);
    return new ResData("Company created successfully", 201, created);
  }


   async findAll() {
    const findAll = await this.repository.findAll();
    return new ResData("All companies", 200, findAll);
  }

  async findOne(id: number) {
    const foundById = await this.repository.findOneById(id);
    if(!foundById){
      throw new NotFoundException("company node found by id")
    }
    return new ResData("One company by id", 200, foundById);
  }

  async findOneByName(name: string) {
    const foundByName = await this.repository.findOneByName(name);
    if(!foundByName){
      throw new NotFoundException("company node found by name")
    }
    return new ResData("One company by name", 200, foundByName);
  }

  async update(id: number, updateCompanyDto: CreateCompanyDto) {
    const {data: foundCompany} = await this.findOne(id)

    const newEntity = new CompanyEntity();
    newEntity.name = updateCompanyDto.name;
    newEntity.owner = updateCompanyDto.owner;
    newEntity.logo = updateCompanyDto.logo;

    const ready = Object.assign(foundCompany, newEntity);

    await this.repository.update(ready, id);
    return new ResData("Updated successfully", 200, ready);
  }

  async remove(id: number) {
    const {data: foundCompany} = await this.findOne(id)

    const deleted = await this.repository.remove(foundCompany);
    return new ResData("Deleted successfully", 200, deleted);
  }
}
