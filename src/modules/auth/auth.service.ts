import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResData } from 'src/lib/resData';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {  LoginDto, RegisterDto } from './dto/create-auth.dto';


export interface ILoginData {
  user: UserEntity;
  token: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ){}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByPhone(
      dto.phone
    );

    if (!foundUser || foundUser.password !== dto.password) {
      throw new BadRequestException("Phone ow password wrong");
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', 200, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {

  const {data} = await this.userService.create(dto);

    const token = await this.jwtService.signAsync({ id: data.id });

    return new ResData<ILoginData>('success', 201
    , {
      user: data,
      token,
    });
  }
}
