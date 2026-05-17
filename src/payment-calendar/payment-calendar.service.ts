import { Injectable } from '@nestjs/common';
import { CreatePaymentCalendarDto } from './dto/create-payment-calendar.dto';
import { UpdatePaymentCalendarDto } from './dto/update-payment-calendar.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentCalendarService {
  constructor(private prisma: PrismaService) {}

  async gerarCalendario(grupoId: string) {
    const membros = await this.prisma.membroGrupo.findMany({
      where: { grupoId },
      orderBy: { ordemRecebimento: 'asc' },
    });

    const calendario: {
      grupoId: string;
      membroId: string;
      numeroCiclo: number;
      dataPrevista: Date;
    }[] = [];

    for (const membro of membros) {
      for (let ciclo = 1; ciclo <= membros.length; ciclo++) {
        calendario.push({
          grupoId,
          membroId: membro.id,
          numeroCiclo: ciclo,
          dataPrevista: new Date(Date.now() + ciclo * 7 * 24 * 60 * 60 * 1000),
        });
      }
    }

    return this.prisma.calendarioPagamento.createMany({
      data: calendario,
    });
  }

  async listarCalendario(grupoId: string) {
    return this.prisma.calendarioPagamento.findMany({
      where: { grupoId },
      include: {
        grupo: true,
      },
      orderBy: {
        numeroCiclo: 'asc',
      },
    });
  }
}
