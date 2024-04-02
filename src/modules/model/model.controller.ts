import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';

@ApiTags("Models")
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get('company/:id')
  findByCompanyId(@Param('id') id: string) {
    return this.modelService.findByCompanyId(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateModelDto: CreateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
