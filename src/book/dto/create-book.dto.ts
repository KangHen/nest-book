import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    category_id: number; 
}