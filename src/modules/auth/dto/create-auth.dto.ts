import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

export class LoginDto {
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({type: String, required: true})
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({type: String, default: RoleEnum.CLIENT})
    @IsNotEmpty()
    @IsEnum(RoleEnum)
    role: RoleEnum;

    @ApiProperty({type: Number, required: true})
    @IsNumber()
    @IsNotEmpty()
    avatar: number;

    @ApiProperty({type: Number, required: true})
    @IsNumber()
    @IsNotEmpty()
    companyId: number;
}
