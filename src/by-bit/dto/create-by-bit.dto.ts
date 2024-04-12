import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateByBitDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsString()
  orderType: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
