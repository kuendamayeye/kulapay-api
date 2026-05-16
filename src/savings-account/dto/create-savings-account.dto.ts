import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSavingsAccountDto {
  @IsUUID()
  utilizadorId: string;

  @IsUUID()
  carteiraId: string;

  @IsString()
  nome: string;

  @IsOptional()
  @IsNumber()
  valorMeta?: number;

  @IsOptional()
  @IsNumber()
  valorActual?: number;

  @IsOptional()
  @IsNumber()
  taxaJuro?: number;

  @IsOptional()
  @IsDateString()
  dataMaturidade?: Date;

  @IsString()
  estado: string;
}
