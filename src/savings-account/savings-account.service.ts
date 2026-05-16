import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavingsAccountDto } from './dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from './dto/update-savings-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavingsAccountService {
  constructor(private prisma: PrismaService) {}

  async create(createSavingsAccountDto: CreateSavingsAccountDto) {
    const savingsAccount = await this.prisma.contaPoupanca.create({
      data: createSavingsAccountDto,
    });

    return savingsAccount;
  }

  async findAll() {
    const savingsAccounts = await this.prisma.contaPoupanca.findMany();

    return savingsAccounts;
  }

  async findOne(id: string) {
    const savingsAccount = await this.prisma.contaPoupanca.findUnique({
      where: {
        id,
      },
    });

    if (!savingsAccount) {
      throw new NotFoundException(
        `SavingsAccount com ID "${id}" não encontrada`,
      );
    }

    return savingsAccount;
  }

  async update(id: string, updateSavingsAccountDto: UpdateSavingsAccountDto) {
    const savingsAccount = await this.prisma.contaPoupanca.update({
      where: { id },
      data: updateSavingsAccountDto,
    });
    return savingsAccount;
  }

  async remove(id: string) {
    const savingsAccount = await this.prisma.contaPoupanca.findUnique({
      where: {
        id,
      },
    });

    if (!savingsAccount) {
      throw new NotFoundException(
        `SavingsAccount com ID "${id}" não encontrada`,
      );
    }

    await this.prisma.contaPoupanca.delete({
      where: { id },
    });

    return `SavingsAccount removida com sucesso`;
  }
}
