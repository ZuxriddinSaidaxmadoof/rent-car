import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
