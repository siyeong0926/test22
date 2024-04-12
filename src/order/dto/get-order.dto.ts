import { IsNotEmpty, IsString } from 'class-validator';

export class GetOrdersDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;
}
