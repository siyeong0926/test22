import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class BitMartService {
  private readonly apiURL: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly apiMemo: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiURL = this.configService.get<string>('BITMART_API_URL');
    this.apiKey = this.configService.get<string>('BITMART_API_KEY');
    this.apiSecret = this.configService.get<string>('BITMART_API_SECRET');
    this.apiMemo = this.configService.get<string>('BITMART_API_MEMO');
  }

  getTimeStamp() {
    return new Date().getTime().toString();
  }

  async createOrder() {
    const timestamp = await this.getTimeStamp();
    const body = {
      size: 100,
      price: 50000,
      side: 'sell',
      symbol: 'BTCUSDT',
      type: 'limit',
    };

    const bodyString = JSON.stringify(body); // 객체를 쿼리 문자열로 순서대로 변환
    const sign = this.signRequest(timestamp, bodyString); // 문자열화된 body 사용
    // 서명을 포함시킨 새로운 요청 본문 생성
    const signedBodyString = `${bodyString}&sign=${sign}`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.configService.get('BITMART_API_URL')}/spot/v2/submit_order`,
          signedBodyString,
          {
            headers: this.getHeaders(sign),
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order on Bybit:', error);
      throw error;
    }
  }

  async getOrderHistory(symbol: string): Promise<any> {
    const timestamp = Date.now();
    const queryString = JSON.stringify({
      symbol: symbol,
      timestamp: timestamp,
    });

    const sign = this.signRequest(queryString, timestamp);

    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.apiURL}/spot/v1/order_detail?${queryString}`,
          {
            headers: this.getHeaders(sign),
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.handleError('비트마트 주문 내역 검색 실패', error);
    }
  }

  async getPriceInfo(): Promise<any> {
    try {
      // JEFF 코인의 심볼을 파라미터로 사용
      const symbol = 'JEFF_USDT'; // 필요에 따라 심볼 변경
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiURL}/spot/v1/ticker?symbol=${symbol}`),
      );
      return response.data;
    } catch (error) {
      this.handleError('JEFF 코인 가격 정보 조회 실패', error);
    }
  }

  // BitMartService에서 JEFF 코인 가격만 조회하는 메소드
  async getJeffPrice(): Promise<number> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiURL}/spot/v1/ticker`, {
          params: { symbol: 'JEFF_USDT' },
        }),
      );
      const data = response.data.data.find(
        (item) => item.symbol === 'JEFF_USDT',
      );
      return parseFloat(data.last_price);
    } catch (error) {
      console.error('JEFF 코인 가격 조회 실패:', error);
      throw new HttpException(
        'BitMart에서 JEFF 가격 정보를 가져올 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getHeaders(sign: string) {
    const timestamp = this.getTimeStamp();
    return {
      'Content-Type': 'application/json', //application/x-www-form-urlencoded
      'X-BM-KEY': this.apiKey,
      'X-BM-TIMESTAMP': timestamp,
      'X-BM-SIGN': this.signRequest(timestamp, JSON.stringify(sign)),
    };
  }

  private signRequest(timestamp, bodys): string {
    const message = `${timestamp}#${this.apiMemo}#${bodys}`;
    console.log('요청본문 출력 : ', bodys);
    return crypto
      .createHmac('sha256', this.configService.get('BITMART_API_SECRET'))
      .update(message)
      .digest('hex');
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
