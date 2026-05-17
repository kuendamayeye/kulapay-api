import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCalendarService } from './payment-calendar.service';

describe('PaymentCalendarService', () => {
  let service: PaymentCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentCalendarService],
    }).compile();

    service = module.get<PaymentCalendarService>(PaymentCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
