// // order.dto.ts
// import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
// import { TradeType } from './trade-type.dto';
//
// export class BithumbDto {
//   @IsEnum(TradeType)
//   type: TradeType;
//
//   @IsNotEmpty()
//   symbol: string;
//
//   @IsNumber()
//   @IsPositive()
//   units: number;
//
//   @IsNumber()
//   price: number;
// }
