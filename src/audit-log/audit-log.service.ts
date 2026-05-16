import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async create(createAuditLogDto: CreateAuditLogDto) {
    const auditLog = await this.prisma.logAuditoria.create({
      data: createAuditLogDto,
    });

    return auditLog;
  }

  async findAll() {
    const auditLogs = await this.prisma.logAuditoria.findMany();

    return auditLogs;
  }

  async findOne(id: string) {
    const auditLog = await this.prisma.logAuditoria.findUnique({
      where: {
        id,
      },
    });

    if (!auditLog) {
      throw new NotFoundException(`AuditLog com ID "${id}" não encontrada`);
    }

    return auditLog;
  }

  async update(id: string, updateAuditLogDto: UpdateAuditLogDto) {
    const auditLog = await this.prisma.logAuditoria.update({
      where: { id },
      data: updateAuditLogDto,
    });
    return auditLog;
  }

  async remove(id: string) {
    const auditLog = await this.prisma.logAuditoria.findUnique({
      where: {
        id,
      },
    });

    if (!auditLog) {
      throw new NotFoundException(`AuditLog com ID "${id}" não encontrada`);
    }

    await this.prisma.logAuditoria.delete({
      where: { id },
    });

    return `AuditLog removida com sucesso`;
  }
}
