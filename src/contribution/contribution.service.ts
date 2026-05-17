import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetodoPagamento } from '@prisma/client';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async pagar(data: any) {
    const membro = await this.prisma.membroGrupo.findFirst({
      where: {
        utilizadorId: data.utilizadorId,
        grupoId: data.grupoId,
      },
    });

    if (!membro) throw new BadRequestException('Não pertence ao grupo');

    return this.prisma.$transaction(async (tx) => {
      // 1. criar contribuição
      const contribuicao = await tx.contribuicao.create({
        data,
      });

      // 2. atualizar carteira
      const valor: number = data.valor;

      await tx.carteira.update({
        where: {
          id: data.carteiraId,
        },
        data: {
          saldo: {
            decrement: valor,
          },
        },
      });

      return contribuicao;
    });
  }

  async contribuir(data: {
    utilizadorId: string;
    grupoId: string;
    valor: number;
    metodoPagamento: string;
    referencia?: string;
    agenteId?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const membro = await tx.membroGrupo.findFirst({
        where: {
          utilizadorId: data.utilizadorId,
          grupoId: data.grupoId,
        },
      });

      if (!membro) {
        throw new BadRequestException('Não é membro do grupo');
      }

      const grupo = await tx.grupo.findUnique({
        where: { id: data.grupoId },
      });

      if (!grupo) throw new BadRequestException('Grupo inválido');

      if (Number(grupo.valorPorCiclo) !== data.valor) {
        throw new BadRequestException('Valor incorreto do ciclo');
      }

      // regista contribuição
      const contribuicao = await tx.contribuicao.create({
        data: {
          utilizadorId: data.utilizadorId,
          grupoId: data.grupoId,
          valor: data.valor,
          estado: 'PAGO',
          metodoPagamento: data.metodoPagamento as MetodoPagamento,
          referencia: data.referencia,
          AgenteId: data.agenteId,
        },
      });

      // atualiza calendário
      await tx.calendarioPagamento.updateMany({
        where: {
          grupoId: data.grupoId,
          membroId: membro.id,
          pago: false,
        },
        data: {
          pago: true,
          pagoEm: new Date(),
        },
      });

      return contribuicao;
    });
  }

  async listarContribuicoes(grupoId: string) {
    return this.prisma.contribuicao.findMany({
      where: { grupoId },
      include: {
        utilizador: true,
      },
      orderBy: {
        pagoEm: 'desc',
      },
    });
  }
}
