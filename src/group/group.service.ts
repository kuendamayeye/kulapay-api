import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.grupo.create({
      data,
    });
  }

  async addMember(grupoId: string, userId: string) {
    const group = await this.prisma.grupo.findUnique({
      where: { id: grupoId },
      include: { membros: true },
    });

    if (!group) throw new BadRequestException('Grupo não encontrado');

    if (group.membros.length >= group.maximoMembros) {
      throw new BadRequestException('Grupo cheio');
    }

    return this.prisma.membroGrupo.create({
      data: {
        grupoId,
        utilizadorId: userId,
        ordemRecebimento: group.membros.length + 1,
      },
    });
  }

  async criarGrupo(data: {
    nome: string;
    descricao?: string;
    valorPorCiclo: number;
    maximoMembros: number;
    frequenciaCiclo: any;
    dataInicio: Date;
    publico?: boolean;
    permitirEntradaAutomatica?: boolean;
    nivelMinimoConfianca?: number;
    criadoPorId: string;
    criadoPorAgenteId?: string;
  }) {
    return this.prisma.grupo.create({
      data: {
        ...data,
        membros: {
          create: {
            utilizadorId: data.criadoPorId,
            ordemRecebimento: 1,
            estado: 'ACTIVO',
          },
        },
      },
      include: {
        membros: true,
      },
    });
  }

  async listarGrupos() {
    return this.prisma.grupo.findMany({
      include: {
        membros: true,
      },
    });
  }

  async obterGrupo(id: string) {
    return this.prisma.grupo.findUnique({
      where: { id },
      include: {
        membros: true,
        contribuicoes: true,
        calendarioPagamentos: true,
      },
    });
  }
}
