import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateByBitDto } from './dto/create-by-bit.dto'; // lastValueFrom 함수를 추가로 import합니다.

@Injectable()
export class ByBitService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  //주문 넣기
  async createOrder(createOrder: CreateByBitDto) {
    const { symbol, orderType, price, quantity } = createOrder;
    const params = {
      api_key: this.configService.get('BYBIT_API_KEY'),
      symbol,
      order_type: orderType,
      price,
      qty: quantity,
      time_in_force: 'GoodTillCancel',
      side: 'Buy',
      timestamp: Date.now(),
      sign: undefined,
    };

    const sign = this.signRequest(params);
    const signedParams = { ...params, sign };

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.configService.get('BYBIT_API_URL')}/v5/order/create`,
          qs.stringify(signedParams),
          {
            headers: this.getHeaders(sign, params.timestamp),
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order on Bybit:', error);
      throw error;
    }
  }

  //주문 내역 확인
  async getOrdersHistory(symbol: string) {
    const timestamp = Date.now();
    const params = {
      api_key: this.configService.get('BYBIT_API_KEY'),
      symbol,
      timestamp,
      sign: undefined,
    };
    const sign = this.signRequest(params);

    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.configService.get('BYBIT_API_URL')}`, {
          headers: this.getHeaders(sign, timestamp),
          params: { symbol },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('바이비트 주문 내역 검색 실패:', error);
      throw error;
    }
  }

  //제프코인 가격 확인 메서드
  async getJeffUsdtPrice() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          // 현물 시장에서의 순간 가격 api
          `${this.configService.get('BYBIT_API_URL')}/v5/market/tickers`,
          {
            params: {
              category: 'spot',
              symbol: 'JEFFUSDT',
            },
          },
        ),
      );
      //console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('제프코인 가격 정보 검색 실패:', error);
      throw error;
    }
  }

  //---------------------API V3 / V5 테스트 메서드--------------------------

  async getJeffCoinInfoV3() {
    const params = {
      api_key: this.configService.get('BYBIT_API_KEY'),
      timestamp: Date.now(),
      coin: 'JEFF', // 조회하고자 하는 코인 이름을 명시합니다.
    };

    const sign = this.signRequest(params);
    const signedParams = { ...params, sign };

    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.configService.get('BYBIT_API_URL')}/derivatives/v3/public/tickers`,
          {
            params: signedParams,
            headers: this.getHeaders(sign, params.timestamp),
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('JEFF 코인 정보 조회 실패:', error);
      throw error;
    }
  }

  async getJeffCoinInfoV5() {
    const params = {
      api_key: this.configService.get('BYBIT_API_KEY'),
      timestamp: Date.now(),
      coin: 'BTC/USDT', // 조회하고자 하는 코인 이름을 명시합니다.
    };

    const sign = this.signRequest(params);
    const signedParams = { ...params, sign };

    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.configService.get('BYBIT_API_URL')}/v5/asset/coin/query-info`,
          {
            params: signedParams,
            headers: this.getHeaders(sign, params.timestamp),
          },
        ),
      );
      return response.data;
    } catch (error) {
      console.error('JEFF 코인 정보 조회 실패:', error);
      throw error;
    }
  }

  //-------------------------서명 / 헤더-------------------------------------------------

  private signRequest(params: any): string {
    const query = qs.stringify(params, { encode: false });
    console.log('파람스 : ', params);
    return crypto
      .createHmac('sha256', this.configService.get('BYBIT_API_SECRET'))
      .update(query)
      .digest('hex');
  }

  private getHeaders(sign: string, timestamp: number) {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-BAPI-API-KEY': this.configService.get('BYBIT_API_KEY'),
      'X-BAPI-TIMESTAMP': timestamp.toString(),
      'X-BAPI-RECV-WINDOW': '20000',
      'X-BAPI-SIGN': sign,
    };
  }
}
