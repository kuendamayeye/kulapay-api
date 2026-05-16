import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  // Depósito Facilitado por Agente Autorizado
  /*async depositoViaAgente(
    agenteId: string,
    telefoneCliente: string,
    valor: number,
  ) {
    if (valor <= 0)
      throw new Error('O valor do depósito deve ser maior que zero.');

    return await prisma.$transaction(async (tx) => {
      // 1. Verificar Agente e o seu Saldo Operacional
      const agente = await tx.agente.findUnique({ where: { id: agenteId } });
      if (!agente || Number(agente.saldoOperacional) < valor) {
        throw new Error(
          'Agente não encontrado ou saldo operacional insuficiente.',
        );
      }

      // 2. Buscar carteira do cliente pelo número de telefone
      const cliente = await tx.utilizador.findUnique({
        where: { telefone: telefoneCliente },
        include: { carteiras: true },
      });
      if (!cliente)
        throw new Error('Cliente com este número de telefone não existe.');

      const carteiraCliente = cliente.carteiras.find(
        (c) => c.tipoCarteira === 'PESSOAL',
      );
      if (!carteiraCliente)
        throw new Error('Carteira pessoal do cliente não encontrada.');

      const codigoRef = `DEP-${uuidv4().substring(0, 8).toUpperCase()}`;

      // 3. Deduzir saldo operacional do Agente
      await tx.agente.update({
        where: { id: agenteId },
        data: { saldoOperacional: { decrement: valor } },
      });

      // 4. Incrementar saldo da carteira do cliente
      await tx.carteira.update({
        where: { id: carteiraCliente.id },
        data: { saldo: { increment: valor } },
      });

      // 5. Registar a Transação com sucesso
      const transaccao = await tx.transaccao.create({
        data: {
          codigoReferencia: codigoRef,
          carteiraDestinoId: carteiraCliente.id,
          tipoTransaccao: TipoTransaccao.DEPOSITO,
          valor: valor,
          estado: EstadoTransaccao.SUCESSO,
          descricao: `Depósito efectuado no agente ${agente.nomeNegocio}`,
          concluidoEm: new Date(),
        },
      });

      // 6. Criar Log de Auditoria
      await tx.logAuditoria.create({
        data: {
          utilizadorId: cliente.id,
          accao: 'DEPOSITO_VIA_AGENTE',
          tipoEntidade: 'Transaccao',
          entidadeId: transaccao.id,
          metadados: { agenteId, valor },
        },
      });

      return transaccao;
    });
  }*/

  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.prisma.transaccao.create({
      data: createTransactionDto,
    });

    return transaction;
  }

  async findAll() {
    const transactions = await this.prisma.transaccao.findMany();

    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaccao.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction com ID "${id}" não encontrada`);
    }

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.prisma.transaccao.update({
      where: { id },
      data: updateTransactionDto,
    });
    return transaction;
  }

  async remove(id: string) {
    const transaction = await this.prisma.transaccao.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction com ID "${id}" não encontrada`);
    }

    await this.prisma.transaccao.delete({
      where: { id },
    });

    return `Transaction removida com sucesso`;
  }
}
