import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
