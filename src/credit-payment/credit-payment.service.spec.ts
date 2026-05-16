import { Test, TestingModule } from '@nestjs/testing';
import { CreditPaymentService } from './credit-payment.service';

describe('CreditPaymentService', () => {
  let service: CreditPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditPaymentService],
    }).compile();

    service = module.get<CreditPaymentService>(CreditPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
