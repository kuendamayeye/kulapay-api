import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) {}

  async create(createAgentDto: CreateAgentDto) {
    const agent = await this.prisma.agente.create({
      data: createAgentDto,
    });

    return agent;
  }

  async findAll() {
    const agents = await this.prisma.agente.findMany();

    return agents;
  }

  async findOne(id: string) {
    const agent = await this.prisma.agente.findUnique({
      where: {
        id,
      },
    });

    if (!agent) {
      throw new NotFoundException(`Agent com ID "${id}" não encontrada`);
    }

    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto) {
    const agent = await this.prisma.agente.update({
      where: { id },
      data: updateAgentDto,
    });
    return agent;
  }

  async remove(id: string) {
    const agent = await this.prisma.agente.findUnique({
      where: {
        id,
      },
    });

    if (!agent) {
      throw new NotFoundException(`Agent com ID "${id}" não encontrada`);
    }

    await this.prisma.agente.delete({
      where: { id },
    });

    return `Agent removida com sucesso`;
  }
}
