import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';
import { ModelRepository } from './model.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity]), SharedModule],
  controllers: [ModelController],
  providers: [ModelService, ModelRepository],
})
export class ModelModule {}
