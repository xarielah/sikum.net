import { Test, TestingModule } from '@nestjs/testing';
import { NovuService } from './novu.service';

describe('NovuService', () => {
  let service: NovuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NovuService],
    }).compile();

    service = module.get<NovuService>(NovuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
