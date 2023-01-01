import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from "class-validator";

export class ChangeStockProductDTO {

    @IsNumber()
    @ApiProperty({
        name: "Amount",
        description: "Amount of product do you want add or remove in stock",
        examples: [10, -10]
    })
    amount: number
}