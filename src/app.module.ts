import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { ByBitModule } from './by-bit/by-bit.module';
import { BitMartModule } from './bit-mart/bit-mart.module';

//import { BithumbModule } from './bithumb/bithumb.module';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ByBitModule,
    BitMartModule,
    //BithumbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
