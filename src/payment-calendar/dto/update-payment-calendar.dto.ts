import { PartialType } from '@nestjs/swagger';
import { CreatePaymentCalendarDto } from './create-payment-calendar.dto';

export class UpdatePaymentCalendarDto extends PartialType(CreatePaymentCalendarDto) {}
