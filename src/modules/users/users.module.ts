import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SharedModule } from 'src/shared/shared.module';
import { FileEntity } from '../file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity]), SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
  // exports: [UsersService, UserRepository]
})
export class UsersModule {}
