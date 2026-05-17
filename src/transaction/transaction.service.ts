import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadoTransaccao, TipoTransaccao } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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

  async depositoViaAgente(
    agenteId: string,
    telefoneCliente: string,
    valor: number,
  ) {
    if (valor <= 0)
      throw new Error('O valor do depósito deve ser maior que zero.');

    return await this.prisma.$transaction(async (tx) => {
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
  }

  async pagamentoServico(
    utilizadorId: string,
    carteiraId: string,
    valor: number,
    servico: string,
    referencia?: string,
  ) {
    if (valor <= 0)
      throw new Error('O valor do pagamento deve ser maior que zero.');

    return await this.prisma.$transaction(async (tx) => {
      // 1. Validar carteira
      const carteira = await tx.carteira.findUnique({
        where: { id: carteiraId },
        include: { utilizador: true },
      });

      if (!carteira || carteira.utilizadorId !== utilizadorId) {
        throw new Error('Carteira inválida.');
      }

      if (Number(carteira.saldo) < valor) {
        throw new Error('Saldo insuficiente.');
      }

      const codigoRef = `SRV-${uuidv4().slice(0, 8).toUpperCase()}`;

      // 2. Debitar saldo
      await tx.carteira.update({
        where: { id: carteiraId },
        data: { saldo: { decrement: valor } },
      });

      // 3. Criar transação
      const transaccao = await tx.transaccao.create({
        data: {
          codigoReferencia: codigoRef,
          carteiraRemetenteId: carteiraId,
          tipoTransaccao: TipoTransaccao.PAGAMENTO_SERVICO,
          valor,
          estado: EstadoTransaccao.SUCESSO,
          descricao: `Pagamento de serviço: ${servico}`,
          concluidoEm: new Date(),
        },
      });

      // 4. Log auditoria
      await tx.logAuditoria.create({
        data: {
          utilizadorId,
          accao: 'PAGAMENTO_SERVICO',
          tipoEntidade: 'Transaccao',
          entidadeId: transaccao.id,
          metadados: { servico, valor, referencia },
        },
      });

      return transaccao;
    });
  }

  async levantamentoViaAgente(
    agenteId: string,
    telefoneCliente: string,
    valor: number,
  ) {
    if (valor <= 0)
      throw new Error('O valor do levantamento deve ser maior que zero.');

    return await this.prisma.$transaction(async (tx) => {
      // 1. Validar agente
      const agente = await tx.agente.findUnique({ where: { id: agenteId } });

      if (!agente) throw new Error('Agente não encontrado.');

      // 2. Buscar cliente
      const cliente = await tx.utilizador.findUnique({
        where: { telefone: telefoneCliente },
        include: { carteiras: true },
      });

      if (!cliente) throw new Error('Cliente não encontrado.');

      const carteira = cliente.carteiras.find(
        (c) => c.tipoCarteira === 'PESSOAL',
      );

      if (!carteira) throw new Error('Carteira não encontrada.');

      if (Number(carteira.saldo) < valor) {
        throw new Error('Saldo insuficiente.');
      }

      const codigoRef = `WTH-${uuidv4().slice(0, 8).toUpperCase()}`;

      // 3. Debitar cliente
      await tx.carteira.update({
        where: { id: carteira.id },
        data: { saldo: { decrement: valor } },
      });

      // 4. Creditar agente (saldo operacional aumenta)
      await tx.agente.update({
        where: { id: agenteId },
        data: { saldoOperacional: { increment: valor } },
      });

      // 5. Criar transação
      const transaccao = await tx.transaccao.create({
        data: {
          codigoReferencia: codigoRef,
          carteiraRemetenteId: carteira.id,
          tipoTransaccao: TipoTransaccao.LEVANTAMENTO,
          valor,
          estado: EstadoTransaccao.SUCESSO,
          descricao: `Levantamento via agente ${agente.nomeNegocio}`,
          concluidoEm: new Date(),
        },
      });

      // 6. Auditoria
      await tx.logAuditoria.create({
        data: {
          utilizadorId: cliente.id,
          accao: 'LEVANTAMENTO_VIA_AGENTE',
          tipoEntidade: 'Transaccao',
          entidadeId: transaccao.id,
          metadados: { agenteId, valor },
        },
      });

      return transaccao;
    });
  }

  async carregamentoProprio(
    utilizadorId: string,
    carteiraId: string,
    valor: number,
    metodo: string,
  ) {
    if (valor <= 0)
      throw new Error('O valor do carregamento deve ser maior que zero.');

    return await this.prisma.$transaction(async (tx) => {
      // 1. Validar carteira
      const carteira = await tx.carteira.findUnique({
        where: { id: carteiraId },
      });

      if (!carteira || carteira.utilizadorId !== utilizadorId) {
        throw new Error('Carteira inválida.');
      }

      const codigoRef = `TOP-${uuidv4().slice(0, 8).toUpperCase()}`;

      // 2. Incrementar saldo
      await tx.carteira.update({
        where: { id: carteiraId },
        data: { saldo: { increment: valor } },
      });

      // 3. Criar transação
      const transaccao = await tx.transaccao.create({
        data: {
          codigoReferencia: codigoRef,
          carteiraDestinoId: carteiraId,
          tipoTransaccao: TipoTransaccao.DEPOSITO,
          valor,
          estado: EstadoTransaccao.SUCESSO,
          canal: metodo,
          descricao: `Carregamento próprio via ${metodo}`,
          concluidoEm: new Date(),
        },
      });

      // 4. Auditoria
      await tx.logAuditoria.create({
        data: {
          utilizadorId,
          accao: 'CARREGAMENTO_PROPRIO',
          tipoEntidade: 'Transaccao',
          entidadeId: transaccao.id,
          metadados: { metodo, valor },
        },
      });

      return transaccao;
    });
  }

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
