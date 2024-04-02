import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCompanyDto {
    @ApiProperty({type: String, required: true, nullable: false})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    owner: number;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    logo: number;
}
