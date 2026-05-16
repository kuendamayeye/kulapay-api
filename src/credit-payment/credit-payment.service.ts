import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreditPaymentDto } from './dto/create-credit-payment.dto';
import { UpdateCreditPaymentDto } from './dto/update-credit-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreditPaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createCreditPaymentDto: CreateCreditPaymentDto) {
    const creditPayment = await this.prisma.pagamentoCredito.create({
      data: createCreditPaymentDto,
    });

    return creditPayment;
  }

  async findAll() {
    const creditPayments = await this.prisma.pagamentoCredito.findMany();

    return creditPayments;
  }

  async findOne(id: string) {
    const creditPayment = await this.prisma.pagamentoCredito.findUnique({
      where: {
        id,
      },
    });

    if (!creditPayment) {
      throw new NotFoundException(
        `CreditPayment com ID "${id}" não encontrada`,
      );
    }

    return creditPayment;
  }

  async update(id: string, updateCreditPaymentDto: UpdateCreditPaymentDto) {
    const creditPayment = await this.prisma.pagamentoCredito.update({
      where: { id },
      data: updateCreditPaymentDto,
    });
    return creditPayment;
  }

  async remove(id: string) {
    const creditPayment = await this.prisma.pagamentoCredito.findUnique({
      where: {
        id,
      },
    });

    if (!creditPayment) {
      throw new NotFoundException(
        `CreditPayment com ID "${id}" não encontrada`,
      );
    }

    await this.prisma.pagamentoCredito.delete({
      where: { id },
    });

    return `CreditPayment removida com sucesso`;
  }
}
