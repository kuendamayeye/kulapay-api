import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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
