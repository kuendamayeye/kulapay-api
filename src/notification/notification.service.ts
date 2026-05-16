import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prisma.notificacao.create({
      data: createNotificationDto,
    });

    return notification;
  }

  async findAll() {
    const notifications = await this.prisma.notificacao.findMany();

    return notifications;
  }

  async findOne(id: string) {
    const notification = await this.prisma.notificacao.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification com ID "${id}" não encontrada`);
    }

    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.prisma.notificacao.update({
      where: { id },
      data: updateNotificationDto,
    });
    return notification;
  }

  async remove(id: string) {
    const notification = await this.prisma.notificacao.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      throw new NotFoundException(`Notification com ID "${id}" não encontrada`);
    }

    await this.prisma.notificacao.delete({
      where: { id },
    });

    return `Notification removida com sucesso`;
  }
}
