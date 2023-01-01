import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

    @IsString()
    @ApiProperty({
        name: "name",
        description: "Name of product"
    })
    name: string

    @IsNumber()
    @ApiProperty({
        name: "Price",
        description: "Price of product"
    })
    price: number

    @IsString()
    @ApiProperty({
        name: "Category",
        description: "Category of product"
    })
    category: string

    @IsNumber()
    @ApiProperty({
        name: "Amount",
        description: "Amount of a product in stock"
    })
    amount: number
}