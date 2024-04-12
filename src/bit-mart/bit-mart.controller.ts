import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BitMartService } from './bit-mart.service';
import { CreateOrderDto } from '../order/dto/create-order.dto';

@Controller('bit-mart')
export class BitMartController {
  constructor(private readonly bitMartService: BitMartService) {}

  //주문 넣기
  @Post('/order')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    const order = await this.bitMartService.createOrder();
    return {
      message: '주문이 성공적으로 생성됨',
      order,
    };
  }

  /**
   * 주문 내역 조회 API 엔드포인트
   * @returns 주문 내역
   */
  @Get('/orderSearch')
  async getOrderHistory(): Promise<any> {
    return await this.bitMartService.getOrderHistory('BTC');
  }

  /**
   * 코인 가격 정보 조회 API 엔드포인트
   * @returns 코인 가격 정보
   */
  @Get('/price')
  async getPriceInfo(): Promise<any> {
    return await this.bitMartService.getPriceInfo();
  }
  // @Get('/jeffprice')
  // async getJeffPrice(): Promise<any> {
  //   return await this.bitMartService.getJeffPrice();
  // }
}
