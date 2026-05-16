import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAddressService {
  constructor(private prisma: PrismaService) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    const userAddress = await this.prisma.enderecoUtilizador.create({
      data: createUserAddressDto,
    });

    return userAddress;
  }

  async findAll() {
    const userAddresss = await this.prisma.enderecoUtilizador.findMany();

    return userAddresss;
  }

  async findOne(id: string) {
    const userAddress = await this.prisma.enderecoUtilizador.findUnique({
      where: {
        id,
      },
    });

    if (!userAddress) {
      throw new NotFoundException(`UserAddress com ID "${id}" não encontrada`);
    }

    return userAddress;
  }

  async update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    const userAddress = await this.prisma.enderecoUtilizador.update({
      where: { id },
      data: updateUserAddressDto,
    });
    return userAddress;
  }

  async remove(id: string) {
    const userAddress = await this.prisma.enderecoUtilizador.findUnique({
      where: {
        id,
      },
    });

    if (!userAddress) {
      throw new NotFoundException(`UserAddress com ID "${id}" não encontrada`);
    }

    await this.prisma.enderecoUtilizador.delete({
      where: { id },
    });

    return `UserAddress removida com sucesso`;
  }
}
