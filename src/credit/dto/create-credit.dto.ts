import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { EstadoCredito } from '@prisma/client';

export class CreateCreditDto {
  @IsUUID()
  utilizadorId: string;

  @IsUUID()
  carteiraId: string;

  @IsNumber()
  valorPrincipal: number;

  @IsNumber()
  taxaJuro: number;

  @IsNumber()
  valorTotal: number;

  @IsOptional()
  @IsNumber()
  valorPago?: number;

  @IsInt()
  duracaoMeses: number;

  @IsOptional()
  @IsInt()
  pontuacaoCredito?: number;

  @IsOptional()
  @IsEnum(EstadoCredito)
  estado?: EstadoCredito;

  @IsOptional()
  @IsDateString()
  aprovadoEm?: Date;

  @IsOptional()
  @IsDateString()
  vencimentoEm?: Date;
}
