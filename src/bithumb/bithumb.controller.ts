// // NestJS 컨트롤러 관련 데코레이터 임포트
// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { BithumbService } from './bithumb.service'; // Bithumb 서비스 클래스 임포트
//
// @Controller('bithumb')
// export class BithumbController {
//   constructor(private readonly bithumbService: BithumbService) {}
//
//   // GET 요청으로 심볼 가격 정보 조회
//   @Get('price/:symbol')
//   async getPrice(@Param('symbol') symbol: string): Promise<number> {
//     return await this.bithumbService.getPrice(symbol);
//   }
//
//   // GET 요청으로 주문장 정보 조회
//   @Get('orderbook/:symbol')
//   async getOrderBook(@Param('symbol') symbol: string) {
//     return await this.bithumbService.getOrderBook(symbol);
//   }
//
//   // POST 요청으로 주문 처리
//   @Post('order')
//   async handleOrder(
//     @Body()
//     orderData: {
//       symbol: string;
//       type: string;
//       units: number;
//       price: number;
//     },
//   ): Promise<void> {
//     await this.bithumbService.handleOrder(
//       orderData.symbol,
//       orderData.type,
//       orderData.units,
//       orderData.price,
//     );
//   }
//
//   // POST 요청으로 주문 취소
//   @Post('cancel')
//   async cancelOrder(
//     @Body()
//     cancelData: {
//       type: string;
//       orderId: string;
//       orderCurrency: string;
//     },
//   ): Promise<void> {
//     await this.bithumbService.cancelOrder(
//       cancelData.type,
//       cancelData.orderId,
//       cancelData.orderCurrency,
//     );
//   }
//
//   // GET 요청으로 오픈 주문 상태 확인
//   @Get('check-orders/:orderId/:symbol')
//   async checkOpenOrders(
//     @Param('orderId') orderId: string,
//     @Param('symbol') symbol: string,
//   ): Promise<number> {
//     return await this.bithumbService.checkOpenOrders(orderId, symbol);
//   }
// }
