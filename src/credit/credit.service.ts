import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreditService {
  /*async solicitarCredito(
    utilizadorId: string,
    valorPretendido: number,
    duracaoMeses: number,
  ) {
    return await prisma.$transaction(async (tx) => {
      // 1. Validar tempo mínimo e volume de actividade (Regra de Negócio do Hackathon)
      const totalTransaccoesSucesso = await tx.transaccao.count({
        where: {
          OR: [
            { carteiraRemetente: { utilizadorId: utilizadorId } },
            { carteiraDestino: { utilizadorId: utilizadorId } },
          ],
          estado: EstadoTransaccao.SUCESSO,
        },
      });

      // Critério: Mínimo de 3 transações concluídas para simular histórico financeiro estável
      if (totalTransaccoesSucesso < 3) {
        throw new Error(
          'Actividade insuficiente na plataforma para concessão de crédito.',
        );
      }

      // 2. Buscar a carteira activa do utilizador para receber o valor
      const carteira = await tx.carteira.findFirst({
        where: { utilizadorId, tipoCarteira: 'PESSOAL' },
      });
      if (!carteira) throw new Error('Carteira pessoal não encontrada.');

      // 3. Configurar taxas de juro locais (ex: 10% de juro simples para o Hackathon)
      const taxaJuro = 10.0;
      const valorTotalAAvaliar = valorPretendido * (1 + taxaJuro / 100);

      // 4. Criar o registo do Crédito já APROVADO pelo motor de regras automático
      const novoCredito = await tx.credito.create({
        data: {
          utilizadorId,
          carteiraId: carteira.id,
          valorPrincipal: valorPretendido,
          taxaJuro: taxaJuro,
          valorTotal: valorTotalAAvaliar,
          duracaoMeses,
          estado: EstadoCredito.ACTIVO,
          aprovadoEm: new Date(),
          vencimentoEm: new Date(
            new Date().setMonth(new Date().getMonth() + duracaoMeses),
          ),
        },
      });

      // 5. Desembolsar o dinheiro imediatamente na carteira do cliente
      await tx.carteira.update({
        where: { id: carteira.id },
        data: { saldo: { increment: valorPretendido } },
      });

      // 6. Registar a transacção do tipo DESEMBOLSO_CREDITO
      await tx.transaccao.create({
        data: {
          codigoReferencia: `CRD-${uuidv4().substring(0, 8).toUpperCase()}`,
          carteiraDestinoId: carteira.id,
          tipoTransaccao: TipoTransaccao.DESEMBOLSO_CREDITO,
          valor: valorPretendido,
          estado: EstadoTransaccao.SUCESSO,
          descricao: `Desembolso de micro-crédito automático ID: ${novoCredito.id}`,
          concluidoEm: new Date(),
        },
      });

      return novoCredito;
    });
  }*/

  constructor(private prisma: PrismaService) {}

  async create(createCreditDto: CreateCreditDto) {
    const credit = await this.prisma.credito.create({
      data: createCreditDto,
    });

    return credit;
  }

  async findAll() {
    const credits = await this.prisma.credito.findMany();

    return credits;
  }

  async findOne(id: string) {
    const credit = await this.prisma.credito.findUnique({
      where: {
        id,
      },
    });

    if (!credit) {
      throw new NotFoundException(`Credito com ID "${id}" não encontrada`);
    }

    return credit;
  }

  async update(id: string, updateCreditDto: UpdateCreditDto) {
    const credit = await this.prisma.credito.update({
      where: { id },
      data: updateCreditDto,
    });
    return credit;
  }

  async remove(id: string) {
    const credit = await this.prisma.credito.findUnique({
      where: {
        id,
      },
    });

    if (!credit) {
      throw new NotFoundException(`Credito com ID "${id}" não encontrada`);
    }

    await this.prisma.credito.delete({
      where: { id },
    });

    return `Credit removida com sucesso`;
  }
}
