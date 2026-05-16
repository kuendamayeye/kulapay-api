import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditPaymentService } from './credit-payment.service';
import { CreateCreditPaymentDto } from './dto/create-credit-payment.dto';
import { UpdateCreditPaymentDto } from './dto/update-credit-payment.dto';

@Controller('pagamentos')
export class CreditPaymentController {
  constructor(private readonly creditPaymentService: CreditPaymentService) {}

  @Post()
  create(@Body() createCreditPaymentDto: CreateCreditPaymentDto) {
    return this.creditPaymentService.create(createCreditPaymentDto);
  }

  @Get()
  findAll() {
    return this.creditPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditPaymentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreditPaymentDto: UpdateCreditPaymentDto,
  ) {
    return this.creditPaymentService.update(id, updateCreditPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditPaymentService.remove(id);
  }
}
