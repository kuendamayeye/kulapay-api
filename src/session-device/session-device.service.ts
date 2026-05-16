import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDeviceDto } from './dto/create-session-device.dto';
import { UpdateSessionDeviceDto } from './dto/update-session-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionDeviceService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDeviceDto: CreateSessionDeviceDto) {
    const deviceSession = await this.prisma.sessaoDispositivo.create({
      data: createSessionDeviceDto,
    });

    return deviceSession;
  }

  async findAll() {
    const deviceSessions = await this.prisma.sessaoDispositivo.findMany();

    return deviceSessions;
  }

  async findOne(id: string) {
    const deviceSession = await this.prisma.sessaoDispositivo.findUnique({
      where: {
        id,
      },
    });

    if (!deviceSession) {
      throw new NotFoundException(
        `SessionDevice com ID "${id}" não encontrada`,
      );
    }

    return deviceSession;
  }

  async update(id: string, updateSessionDeviceDto: UpdateSessionDeviceDto) {
    const deviceSession = await this.prisma.sessaoDispositivo.update({
      where: { id },
      data: updateSessionDeviceDto,
    });
    return deviceSession;
  }

  async remove(id: string) {
    const deviceSession = await this.prisma.sessaoDispositivo.findUnique({
      where: {
        id,
      },
    });

    if (!deviceSession) {
      throw new NotFoundException(
        `SessionDevice com ID "${id}" não encontrada`,
      );
    }

    await this.prisma.sessaoDispositivo.delete({
      where: { id },
    });

    return `SessionDevice removida com sucesso`;
  }
}
