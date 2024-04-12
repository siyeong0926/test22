export class CreateBitMartDto {
  symbol: string; // 코인 심볼 (예: "BTC_USDT")
  type: string; // 주문 유형 (예: "limit", "market" 등)
  price: number; // 주문 가격 (지정가 주문의 경우 필요)
  size: number; // 주문 수량
  side: string; // 주문 방향 ("buy" 또는 "sell")
}
