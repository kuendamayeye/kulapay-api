import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCalendarController } from './payment-calendar.controller';
import { PaymentCalendarService } from './payment-calendar.service';

describe('PaymentCalendarController', () => {
  let controller: PaymentCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentCalendarController],
      providers: [PaymentCalendarService],
    }).compile();

    controller = module.get<PaymentCalendarController>(PaymentCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
