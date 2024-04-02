import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsObject, Min, IsDate, IsDateString } from "class-validator";
import { StatusEnum, StatusTrack } from "src/common/enums/enum";


export class CreateTransactionDto {
    @ApiProperty({type: Number, required: true})
    @IsNotEmpty()
    @IsNumber()
    companyId: number;

    @ApiProperty({type: Number, required: true})
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({type: Number, required: true})
    @IsNotEmpty()
    @IsNumber()
    carId: number;

    @ApiProperty({type: Number, required: true, nullable: false, default: 100})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    startKm: number;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    endKm: number;

    @ApiProperty({type: Date, required: true, nullable: false, default: new Date()})
    @IsDateString()
    startDate: Date;

    @ApiProperty({type: Date, required: true, nullable: false, default: new Date()})
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({type: String, required: true, nullable: false, default: "credit"})
    @IsEnum(StatusEnum)
    @IsNotEmpty()
    status: StatusEnum;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    startedKm: number;

    @ApiProperty({type: Number, required: true, nullable: false})
    @IsNotEmpty()
    @IsNumber()
    endedKm: number;

    @ApiProperty({type: String, required: true, nullable: false, default: "created"})
    @IsEnum(StatusTrack)
    @IsNotEmpty()
    statusTrack: StatusTrack;
}
