import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstadoContribuicao, MetodoPagamento } from '@prisma/client';

export class CreateContributionDto {
  @IsString()
  utilizadorId: string;

  @IsString()
  grupoId: string;

  @IsNumber()
  valor: number;

  @IsEnum(EstadoContribuicao)
  estado: EstadoContribuicao;

  @IsEnum(MetodoPagamento)
  metodoPagamento: MetodoPagamento;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsString()
  agenteId?: string;
}
