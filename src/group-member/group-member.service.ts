import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupMemberService {
  constructor(private prisma: PrismaService) {}

  async entrarGrupo(utilizadorId: string, grupoId: string) {
    const grupo = await this.prisma.grupo.findUnique({
      where: { id: grupoId },
      include: { membros: true },
    });

    if (!grupo) throw new BadRequestException('Grupo não existe');

    if (grupo.membros.length >= grupo.maximoMembros) {
      throw new BadRequestException('Grupo cheio');
    }

    return this.prisma.membroGrupo.create({
      data: {
        utilizadorId,
        grupoId,
        ordemRecebimento: grupo.membros.length + 1,
      },
    });
  }

  async listarMembros(grupoId: string) {
    return this.prisma.membroGrupo.findMany({
      where: { grupoId },
      include: {
        utilizador: true,
      },
      orderBy: {
        ordemRecebimento: 'asc',
      },
    });
  }

  async removerMembro(id: string) {
    return this.prisma.membroGrupo.delete({
      where: { id },
    });
  }
}
