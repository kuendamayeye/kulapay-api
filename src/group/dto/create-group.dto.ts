import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { FrequenciaCiclo } from '@prisma/client';

export class CreateGroupDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsInt()
  valorPorCiclo: number;

  @IsInt()
  maximoMembros: number;

  @IsEnum(FrequenciaCiclo)
  frequenciaCiclo: FrequenciaCiclo;

  @IsDateString()
  dataInicio: string;

  @IsOptional()
  @IsBoolean()
  publico?: boolean;

  @IsOptional()
  @IsBoolean()
  permitirEntradaAutomatica?: boolean;

  @IsOptional()
  @IsInt()
  nivelMinimoConfianca?: number;

  @IsString()
  criadoPorId: string;

  @IsOptional()
  @IsString()
  criadoPorAgenteId?: string;
}
