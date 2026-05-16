import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { EstadoTransaccao, TipoTransaccao } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  codigoReferencia: string;

  @IsOptional()
  @IsUUID()
  carteiraRemetenteId?: string;

  @IsOptional()
  @IsUUID()
  carteiraDestinoId?: string;

  @IsEnum(TipoTransaccao)
  tipoTransaccao: TipoTransaccao;

  @IsNumber()
  valor: number;

  @IsOptional()
  @IsNumber()
  taxa?: number;

  @IsOptional()
  @IsString()
  moeda?: string;

  @IsOptional()
  @IsEnum(EstadoTransaccao)
  estado?: EstadoTransaccao;

  @IsOptional()
  @IsString()
  canal?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
