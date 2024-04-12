import { Test, TestingModule } from '@nestjs/testing';
import { ByBitService } from './by-bit.service';

describe('ByBitService', () => {
  let service: ByBitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ByBitService],
    }).compile();

    service = module.get<ByBitService>(ByBitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
