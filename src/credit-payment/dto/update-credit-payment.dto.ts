import { PartialType } from '@nestjs/swagger';
import { CreateCreditPaymentDto } from './create-credit-payment.dto';

export class UpdateCreditPaymentDto extends PartialType(CreateCreditPaymentDto) {}
