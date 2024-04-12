// // NestJS의 Injectable 데코레이터를 사용하여 클래스를 서비스로 등록
// import { Injectable } from '@nestjs/common';
// import ApiBithumb from 'node-bithumb'; // Bithumb API 라이브러리 임포트
// import { tradeType } from 'node-bithumb/dist/types'; // Bithumb API의 거래 타입 정의 임포트
//
// @Injectable()
// export class BithumbService {
//   private bithumbApi: ApiBithumb;
//
//   constructor() {
//     // 환경 변수에서 API 관련 정보를 가져옴
//     const apiKey = process.env.BITHUMB_API_KEY;
//     const apiSecret = process.env.BITHUMB_API_SECRET;
//     const paymentCurrency = process.env.PAYMENT_CURRENCY || 'KRW'; // 기본 통화를 KRW로 설정
//     // Bithumb API 클라이언트 초기화
//     this.bithumbApi = new ApiBithumb(apiKey, apiSecret, paymentCurrency);
//   }
//
//   // 심볼에 대한 가격 정보를 가져오는 함수
//   async getPrice(symbol: string): Promise<number> {
//     try {
//       const ticker = await this.bithumbApi.getTicker(symbol); // API를 통해 ticker 정보 요청
//       const price = parseFloat(ticker.data.closing_price); // 종가를 부동소수점 숫자로 변환
//       return price;
//     } catch (error) {
//       console.error('가격 정보를 가져오는 중 오류 발생:', error);
//       throw new Error('Error fetching price');
//     }
//   }
//
//   // 심볼에 대한 주문장 정보를 가져오는 함수
//   async getOrderBook(symbol: string): Promise<{
//     bids: Array<{ price: string; quantity: string }>;
//     asks: Array<{ price: string; quantity: string }>;
//   }> {
//     try {
//       const orderBook = await this.bithumbApi.getOrderBook(symbol); // 주문장 정보 요청
//       const bids = orderBook.data.bids.slice(0, 2); // 상위 2개의 매수 주문 추출
//       const asks = orderBook.data.asks.slice(0, 2); // 상위 2개의 매도 주문 추출
//       return { bids, asks };
//     } catch (error) {
//       console.error('주문장 정보를 가져오는 중 오류 발생:', error);
//       throw new Error('Error fetching order book');
//     }
//   }
//
//   // 주문 처리 함수
//   async handleOrder(
//     symbol: string,
//     type: string,
//     units: number,
//     price: number,
//   ): Promise<void> {
//     try {
//       const orderType: tradeType = type === 'buy' ? 'bid' : 'ask'; // 매수는 'bid', 매도는 'ask'
//       await this.bithumbApi.postPlace(symbol, units, price, orderType); // 주문 실행
//     } catch (error) {
//       console.error('주문 처리 중 오류 발생:', error);
//       throw new Error('Error handling order');
//     }
//   }
//
//   // 주문 취소 함수
//   async cancelOrder(
//     type: tradeType,
//     orderId: string,
//     orderCurrency: string,
//   ): Promise<void> {
//     try {
//       await this.bithumbApi.postCancel(type, orderId, orderCurrency); // 주문 취소 요청
//     } catch (error) {
//       console.error('주문 취소 중 오류 발생:', error);
//       throw new Error('Error canceling order');
//     }
//   }
//
//   // 오픈 주문 확인 함수
//   async checkOpenOrders(orderId: string, symbol: string): Promise<number> {
//     try {
//       const detailResult = await this.bithumbApi.postOrderDetail(
//         orderId,
//         symbol,
//       ); // 주문 상세 정보 요청
//       if (detailResult && detailResult.data && detailResult.data.length > 0) {
//         for (const detail of detailResult.data) {
//           if (detail.order_status !== 'Completed') {
//             return 1; // 'Completed' 상태가 아닌 주문이 있으면 1 반환
//           }
//         }
//         return 0; // 모든 주문이 완료된 상태면 0 반환
//       } else {
//         return 0; // 주문 상세 정보 없음
//       }
//     } catch (error) {
//       console.error('오픈 주문 확인 중 오류 발생:', error);
//       throw new Error('Error checking open orders');
//     }
//   }
// }
