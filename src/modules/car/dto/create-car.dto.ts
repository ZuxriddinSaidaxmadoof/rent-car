import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsObject, Min } from "class-validator";


export class CreateCarDto {
    @ApiProperty({type: String, required: true, nullable: false})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    modelId: number;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    companyId: number;

    @ApiProperty({type: Object, required: true, nullable: false})
    @IsNotEmpty()
    @IsObject()
    info: Object;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;
}
