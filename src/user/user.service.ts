import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoUsuario, TipoCarteira } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(data: {
    nomeCompleto: string;
    telefone: string;
    pin: string;
  }) {
    // 1. Verificar se o número de telefone já existe
    const userExiste = await this.prisma.utilizador.findUnique({
      where: { telefone: data.telefone },
    });

    if (userExiste) {
      throw new Error('Este número de telefone já está registado em Angola.');
    }

    // 2. Encriptar o PIN de acesso (Segurança)
    const hashPin = await bcrypt.hash(data.pin, 10);

    // 3. Criar utilizador e a sua Carteira Pessoal numa transação atómica
    return await this.prisma.$transaction(async (tx) => {
      const novoUtilizador = await tx.utilizador.create({
        data: {
          nomeCompleto: data.nomeCompleto,
          telefone: data.telefone,
          hashPin: hashPin,
          estado: EstadoUsuario.ACTIVO,
        },
      });

      // Criar automaticamente a carteira pessoal em Kwanzas (AOA)
      await tx.carteira.create({
        data: {
          utilizadorId: novoUtilizador.id,
          tipoCarteira: TipoCarteira.PESSOAL,
          saldo: 0,
          moeda: 'AOA',
        },
      });

      return novoUtilizador;
    });
  }

  async autenticar(telefone: string, pin: string) {
    const utilizador = await this.prisma.utilizador.findUnique({
      where: { telefone },
    });
    if (!utilizador || utilizador.estado !== EstadoUsuario.ACTIVO) {
      throw new Error('Utilizador não encontrado ou inactivo.');
    }

    const pinValido = await bcrypt.compare(pin, utilizador.hashPin);
    if (!pinValido) throw new Error('PIN incorreto.');

    return utilizador; // Num ambiente real, aqui gerarias um JWT Token
  }

  async findAll() {
    const users = await this.prisma.utilizador.findMany();

    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.utilizador.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User com ID "${id}" não encontrada`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.utilizador.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.utilizador.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User com ID "${id}" não encontrada`);
    }

    await this.prisma.utilizador.delete({
      where: { id },
    });

    return `User removida com sucesso`;
  }
}
