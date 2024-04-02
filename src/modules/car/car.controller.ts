import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@ApiTags("Cars")
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get('company/:id')
  findByCompanyId(@Param('id') id: string) {
    return this.carService.findByCompanyId(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR, RoleEnum.CLIENT)
  @Get('model/:id')
  findByModelId(@Param('id') id: string) {
    return this.carService.findByModelId(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
