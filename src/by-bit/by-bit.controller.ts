import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateByBitDto } from './dto/create-by-bit.dto';
import { ByBitService } from './by-bit.service';

@Controller('by-bit')
export class ByBitController {
  constructor(private readonly byBitService: ByBitService) {}
  // 주문 생성
  @Post('/order')
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrder: CreateByBitDto) {
    // OrderService를 통해 주문 생성 로직을 처리하고 결과를 반환합니다.
    const order = await this.byBitService.createOrder(createOrder);
    return {
      message: '주문이 성공적으로 생성되었습니다.',
      order,
    };
  }

  // 주문 조회
  @Get('/search/:symbol')
  async getOrdersHistory(@Param('symbol') symbol: string) {
    // OrderService를 통해 특정 심볼에 대한 주문 목록 조회 로직을 처리하고 결과를 반환합니다.
    const orders = await this.byBitService.getOrdersHistory(symbol);
    return {
      message: '주문이 성공적으로 검색 되었음',
      orders,
    };
  }

  @Get('/searchJEFF')
  async getBtcUsdtPrice() {
    const jeff = await this.byBitService.getJeffUsdtPrice();
    return {
      message: '제프 코인 현재 정보 검색 완료',
      jeff,
    };
  }

  //--------------------------------------------------------------------------

  @Get('/jeffv3')
  async getJeffCoinInfoV3() {
    const jeff = await this.byBitService.getJeffCoinInfoV3();
    return {
      message: '제프 코인 정보',
      jeff,
    };
  }

  @Get('/jeffv5')
  async getJeffCoinInfoV5() {
    const jeff = await this.byBitService.getJeffCoinInfoV5();
    return {
      message: '제프 코인 정보',
      jeff,
    };
  }
}
