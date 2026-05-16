import { Module } from '@nestjs/common';
import { CreditPaymentService } from './credit-payment.service';
import { CreditPaymentController } from './credit-payment.controller';

@Module({
  controllers: [CreditPaymentController],
  providers: [CreditPaymentService],
})
export class CreditPaymentModule {}
