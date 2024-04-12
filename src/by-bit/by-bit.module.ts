import { Module } from '@nestjs/common';
import { ByBitService } from './by-bit.service';
import { ByBitController } from './by-bit.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ByBitController],
  providers: [ByBitService],
})
export class ByBitModule {}
