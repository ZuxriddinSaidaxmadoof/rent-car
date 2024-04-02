import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResData } from 'src/lib/resData';
import { CarRepository } from '../car/car.repository';
import { CompanyRepository } from '../company/company.repository';
import { UserRepository } from '../users/user.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {

  constructor(private readonly repository: TransactionRepository,
    private readonly userRepository: UserRepository,
    @Inject("ICompanyRepository") private readonly companyRepository: CompanyRepository,
    @Inject("ICarRepository") private readonly carRepository: CarRepository
    ){}

  async create(createTransactionDto: CreateTransactionDto) {
    const checkUserExist = await this.userRepository.findOneById(createTransactionDto.userId);
    if(!checkUserExist){
      throw new NotFoundException("User not found")
    }

    const checkCompanyExist = await this.companyRepository.findOneById(createTransactionDto.companyId);
    if(!checkCompanyExist){
      throw new NotFoundException("Company not found")
    }

    const checkCarExist = await this.carRepository.findOneById(createTransactionDto.carId);
    if(!checkCarExist){
      throw new NotFoundException("Car not found")
    }


    const newEntity = new TransactionEntity();
    newEntity.carId = createTransactionDto.carId;
    newEntity.companyId = createTransactionDto.companyId;
    newEntity.userId = createTransactionDto.userId;
    newEntity.price = createTransactionDto.price;
    newEntity.startKm = createTransactionDto.startKm;
    newEntity.endKm = createTransactionDto.endKm;
    newEntity.startDate = createTransactionDto.startDate;
    newEntity.endDate = createTransactionDto.endDate;
    newEntity.status = createTransactionDto.status;
    newEntity.startedKm = createTransactionDto.startedKm;
    newEntity.endedKm = createTransactionDto.endedKm;
    newEntity.statusTrack = createTransactionDto.statusTrack;
    newEntity.carData = checkCarExist;
    newEntity.userData = checkUserExist;
    newEntity.createdBy = 3;



    const created = await this.repository.create(newEntity);
    return new ResData("Transaction created successfully", 201, created);
  }

  async findAll() {
    const findAll = await this.repository.findAll();
    return new ResData("All transactions", 200, findAll);
  }

  async findOne(id: number) {
    const foundById = await this.repository.findOneById(id);
    if(!foundById){
      throw new NotFoundException("Transaction not found by id")
    }
    return new ResData("One model by id", 200, foundById);
  }

  async update(id: number, updateTransactionDto: CreateTransactionDto) {
    const checkTransaction = await this.repository.findOneById(id);

    const checkUserExist = await this.userRepository.findOneById(updateTransactionDto.userId);
    if(!checkUserExist){
      throw new NotFoundException("User not found")
    }

    const checkCompanyExist = await this.companyRepository.findOneById(updateTransactionDto.companyId);
    if(!checkCompanyExist){
      throw new NotFoundException("Company not found")
    }

    const checkCarExist = await this.carRepository.findOneById(updateTransactionDto.carId);
    if(!checkCarExist){
      throw new NotFoundException("Car not found")
    }
    
    if(!checkTransaction){
      throw new NotFoundException("Transaction not found")
    }

    const newEntity = new TransactionEntity();
    newEntity.carId = updateTransactionDto.carId || checkTransaction.carId;
    newEntity.companyId = updateTransactionDto.companyId || checkTransaction.companyId;
    newEntity.userId = updateTransactionDto.userId || checkTransaction.userId;
    newEntity.price = updateTransactionDto.price || checkTransaction.price;
    newEntity.startKm = updateTransactionDto.startKm || checkTransaction.startKm;
    newEntity.endKm = updateTransactionDto.endKm || checkTransaction.endKm;
    newEntity.startDate = updateTransactionDto.startDate || checkTransaction.startDate;
    newEntity.endDate = updateTransactionDto.endDate || checkTransaction.endDate;
    newEntity.status = updateTransactionDto.status || checkTransaction.status;
    newEntity.startedKm = updateTransactionDto.startedKm || checkTransaction.startedKm;
    newEntity.endedKm = updateTransactionDto.endedKm || checkTransaction.endedKm;
    newEntity.statusTrack = updateTransactionDto.statusTrack || checkTransaction.statusTrack;
    newEntity.createdBy = 3;

    
    await this.repository.update(newEntity, id);
    return new ResData("Updated successfully", 200, newEntity);
  }

  async remove(id: number) {
    const {data: foundTransaction} = await this.findOne(id)

    const deleted = await this.repository.remove(foundTransaction);
    return new ResData("Deleted successfully", 200, deleted);
  }
}
