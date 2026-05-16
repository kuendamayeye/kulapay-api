import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { EstadoCarteira, TipoCarteira } from '@prisma/client';

export class CreateWalletDto {
  @IsUUID()
  utilizadorId: string;

  @IsOptional()
  @IsNumber()
  saldo?: number;

  @IsOptional()
  @IsString()
  moeda?: string;

  @IsOptional()
  @IsEnum(TipoCarteira)
  tipoCarteira?: TipoCarteira;

  @IsOptional()
  @IsEnum(EstadoCarteira)
  estado?: EstadoCarteira;
}
