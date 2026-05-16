import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async create(createWalletDto: CreateWalletDto) {
    const wallet = await this.prisma.carteira.create({
      data: createWalletDto,
    });

    return wallet;
  }

  async findAll() {
    const wallets = await this.prisma.carteira.findMany();

    return wallets;
  }

  async findOne(id: string) {
    const wallet = await this.prisma.carteira.findUnique({
      where: {
        id,
      },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet com ID "${id}" não encontrada`);
    }

    return wallet;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.prisma.carteira.update({
      where: { id },
      data: updateWalletDto,
    });
    return wallet;
  }

  async remove(id: string) {
    const wallet = await this.prisma.carteira.findUnique({
      where: {
        id,
      },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet com ID "${id}" não encontrada`);
    }

    await this.prisma.carteira.delete({
      where: { id },
    });

    return `Wallet removida com sucesso`;
  }
}
