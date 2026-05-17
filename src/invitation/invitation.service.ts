import { Injectable } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvitationService {
  constructor(private prisma: PrismaService) {}

  async convidar(data: {
    grupoId: string;
    convidadoPorId: string;
    telefone?: string;
  }) {
    return this.prisma.convite.create({
      data: {
        grupoId: data.grupoId,
        convidadoPorId: data.convidadoPorId,
        telefone: data.telefone,
        token: randomUUID(),
        estado: 'PENDENTE',
        expiraEm: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      },
    });
  }

  async aceitarConvite(token: string, utilizadorId: string) {
    const convite = await this.prisma.convite.findUnique({
      where: { token },
    });

    if (!convite || convite.estado !== 'PENDENTE') {
      throw new Error('Convite inválido');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.membroGrupo.create({
        data: {
          grupoId: convite.grupoId,
          utilizadorId,
          ordemRecebimento: 1,
        },
      });

      return tx.convite.update({
        where: { id: convite.id },
        data: { estado: 'ACEITE' },
      });
    });
  }
}
