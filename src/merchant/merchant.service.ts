import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MerchantService {
  constructor(private prisma: PrismaService) {}

  async create(createMerchantDto: CreateMerchantDto) {
    const merchant = await this.prisma.comerciante.create({
      data: createMerchantDto,
    });

    return merchant;
  }

  async findAll() {
    const merchants = await this.prisma.comerciante.findMany();

    return merchants;
  }

  async findOne(id: string) {
    const merchant = await this.prisma.comerciante.findUnique({
      where: {
        id,
      },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant com ID "${id}" não encontrada`);
    }

    return merchant;
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto) {
    const merchant = await this.prisma.comerciante.update({
      where: { id },
      data: updateMerchantDto,
    });
    return merchant;
  }

  async remove(id: string) {
    const merchant = await this.prisma.comerciante.findUnique({
      where: {
        id,
      },
    });

    if (!merchant) {
      throw new NotFoundException(`Merchant com ID "${id}" não encontrada`);
    }

    await this.prisma.comerciante.delete({
      where: { id },
    });

    return `Merchant removida com sucesso`;
  }
}
