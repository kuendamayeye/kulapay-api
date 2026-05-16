import { Test, TestingModule } from '@nestjs/testing';
import { CreditPaymentController } from './credit-payment.controller';
import { CreditPaymentService } from './credit-payment.service';

describe('CreditPaymentController', () => {
  let controller: CreditPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditPaymentController],
      providers: [CreditPaymentService],
    }).compile();

    controller = module.get<CreditPaymentController>(CreditPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
