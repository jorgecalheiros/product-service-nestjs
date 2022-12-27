import { IsNumber } from "class-validator";

export class ChangeStockProductDTO {

    @IsNumber()
    amount: number
}