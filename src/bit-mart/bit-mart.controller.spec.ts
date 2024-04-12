import { Test, TestingModule } from '@nestjs/testing';
import { BitMartController } from './bit-mart.controller';
import { BitMartService } from './bit-mart.service';

describe('BitMartController', () => {
  let controller: BitMartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BitMartController],
      providers: [BitMartService],
    }).compile();

    controller = module.get<BitMartController>(BitMartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
