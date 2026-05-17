import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentCalendarService } from './payment-calendar.service';
import { CreatePaymentCalendarDto } from './dto/create-payment-calendar.dto';
import { UpdatePaymentCalendarDto } from './dto/update-payment-calendar.dto';

@Controller('payment-calendar')
export class PaymentCalendarController {
  constructor(
    private readonly paymentCalendarService: PaymentCalendarService,
  ) {}

  @Post('gerar/:grupoId')
  gerarCalendario(@Param('grupoId') grupoId: string) {
    return this.paymentCalendarService.gerarCalendario(grupoId);
  }

  @Get('grupo/:grupoId')
  listarCalendario(@Param('grupoId') grupoId: string) {
    return this.paymentCalendarService.listarCalendario(grupoId);
  }
}
