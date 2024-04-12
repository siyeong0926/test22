import { Test, TestingModule } from '@nestjs/testing';
import { ByBitController } from './by-bit.controller';
import { ByBitService } from './by-bit.service';

describe('ByBitController', () => {
  let controller: ByBitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ByBitController],
      providers: [ByBitService],
    }).compile();

    controller = module.get<ByBitController>(ByBitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
