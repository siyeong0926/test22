import { Module } from '@nestjs/common';
import { BitMartService } from './bit-mart.service';
import { BitMartController } from './bit-mart.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [BitMartController],
  providers: [BitMartService],
})
export class BitMartModule {}
