import { IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsString()
    category: string

    @IsNumber()
    amount: number
}