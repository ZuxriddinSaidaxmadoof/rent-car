import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { FileEntity } from './modules/file/entities/file.entity';
import { FileModule } from './modules/file/file.module';
import { UserEntity } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { CompanyModule } from './modules/company/company.module';
import { SharedModule } from './shared/shared.module';
import { CompanyEntity } from './modules/company/entities/company.entity';
import { ModelModule } from './modules/model/model.module';
import { ModelEntity } from './modules/model/entities/model.entity';
import { CarModule } from './modules/car/car.module';
import { CarEntity } from './modules/car/entities/car.entity';
import { TransactionModule } from './modules/transaction/transaction.module';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'YOUR_PASSWORD',
      database: 'rent',
      entities: [FileEntity, UserEntity, CompanyEntity, ModelEntity, CarEntity, TransactionEntity],
      synchronize: true,
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async() => {
        const store =await redisStore({
          socket: {host: 'redis',port: 6379},
          ttl: 10 * 1000
        })
        return {store}
      }
    }),
    AuthModule,
     FileModule,
     UsersModule,
     CompanyModule,
     SharedModule,
     ModelModule,
     CarModule,
     TransactionModule,
     
    ],
})
export class AppModule {}
