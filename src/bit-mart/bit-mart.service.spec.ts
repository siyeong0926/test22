import { Test, TestingModule } from '@nestjs/testing';
import { BitMartService } from './bit-mart.service';

describe('BitMartService', () => {
  let service: BitMartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitMartService],
    }).compile();

    service = module.get<BitMartService>(BitMartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
