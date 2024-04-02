import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateModelDto {
    @ApiProperty({type: String, required: true, nullable: false})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    companyId: number;
}
