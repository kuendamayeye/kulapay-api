import { Module } from '@nestjs/common';
import { PaymentCalendarService } from './payment-calendar.service';
import { PaymentCalendarController } from './payment-calendar.controller';

@Module({
  controllers: [PaymentCalendarController],
  providers: [PaymentCalendarService],
})
export class PaymentCalendarModule {}
