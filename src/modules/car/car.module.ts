import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), SharedModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
