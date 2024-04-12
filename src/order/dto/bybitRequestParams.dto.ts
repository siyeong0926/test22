import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class BybitRequestParams {
  @IsNotEmpty()
  @IsString()
  api_key: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsString()
  order_type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty: number;

  @IsNotEmpty()
  @IsString()
  time_in_force: string;

  @IsNotEmpty()
  @IsString()
  side: string;

  @IsNotEmpty()
  @IsNumber()
  timestamp: number;

  sign?: string; // 옵셔널 프로퍼티로 정의
}
