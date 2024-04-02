import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';


@ApiTags("Transactions")
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
