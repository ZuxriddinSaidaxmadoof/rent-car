import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { FileService } from '../file/file.service';
import { UsersService } from '../users/users.service';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';


@ApiTags("Companies")
@Controller('company')
export class CompanyController {
  constructor(private readonly UserService: UsersService, private readonly companyService: CompanyService, @Inject("iFileService") private readonly fileService: FileService) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    await this.fileService.findOne(createCompanyDto.logo)
    await this.UserService.findOne(createCompanyDto.owner)
    return this.companyService.create(createCompanyDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: CreateCompanyDto) {
    await this.fileService.findOne(updateCompanyDto.logo)
    await this.UserService.findOne(updateCompanyDto.owner)
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
