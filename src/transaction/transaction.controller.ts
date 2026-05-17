import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DepositoViaAgenteDto } from './dto/deposito-via-agent.dto';
import { LevantamentoViaAgenteDto } from './dto/levantamento-via-agente.dto';
import { PagamentoServicoDto } from './dto/pagamento-servico.dto';
import { CarregamentoProprioDto } from './dto/carregamento.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transacoes')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /*async depositarViaAgente(req: Request, res: Response) {
    try {
      const { agenteId, telefoneCliente, valor } = req.body;

      const transaccao = await transaccaoService.depositoViaAgente(
        agenteId,
        telefoneCliente,
        Number(valor),
      );

      return res.status(200).json({
        sucesso: true,
        mensagem: 'Depósito realizado com sucesso!',
        referencia: transaccao.codigoReferencia,
      });
    } catch (error: any) {
      return res.status(400).json({ sucesso: false, erro: error.message });
    }
  }*/

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('deposito/agente')
  async depositoViaAgente(@Body() dto: DepositoViaAgenteDto) {
    return this.transactionService.depositoViaAgente(
      dto.agenteId,
      dto.telefoneCliente,
      dto.valor,
    );
  }

  @Post('levantamento/agente')
  async levantamentoViaAgente(@Body() dto: LevantamentoViaAgenteDto) {
    return this.transactionService.levantamentoViaAgente(
      dto.agenteId,
      dto.telefoneCliente,
      dto.valor,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('pagamento/servico')
  async pagamentoServico(@Body() dto: PagamentoServicoDto) {
    return this.transactionService.pagamentoServico(
      dto.utilizadorId,
      dto.carteiraId,
      dto.valor,
      dto.servico,
      dto.referencia,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('carregamento/proprio')
  async carregamentoProprio(@Body() dto: CarregamentoProprioDto) {
    return this.transactionService.carregamentoProprio(
      dto.utilizadorId,
      dto.carteiraId,
      dto.valor,
      dto.metodo,
    );
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
