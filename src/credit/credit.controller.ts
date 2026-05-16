import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('creditos')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  /*async pedirCredito(req: Request, res: Response) {
    try {
      const { utilizadorId, valorPretendido, duracaoMeses } = req.body;

      if (!utilizadorId || !valorPretendido || !duracaoMeses) {
        return res
          .status(400)
          .json({ erro: 'Dados inválidos para análise de crédito.' });
      }

      const credito = await creditoService.solicitarCredito(
        utilizadorId,
        Number(valorPretendido),
        Number(duracaoMeses),
      );

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Crédito analisado e desembolsado na sua carteira!',
        detalhes: {
          creditoId: credito.id,
          valorA_Pagar: credito.valorTotal,
          vencimento: credito.vencimentoEm,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ sucesso: false, erro: error.message });
    }
  }*/

  @Post()
  create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditService.create(createCreditDto);
  }

  @Get()
  findAll() {
    return this.creditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditDto: UpdateCreditDto) {
    return this.creditService.update(id, updateCreditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditService.remove(id);
  }
}
