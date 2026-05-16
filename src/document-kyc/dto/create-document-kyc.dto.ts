import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { EstadoKyc } from '@prisma/client';

export class CreateDocumentKycDto {
  @IsUUID()
  utilizadorId: string;

  @IsString()
  tipoDocumento: string;

  @IsString()
  numeroDocumento: string;

  @IsOptional()
  @IsString()
  frenteDocumentoUrl?: string;

  @IsOptional()
  @IsString()
  versoDocumentoUrl?: string;

  @IsOptional()
  @IsString()
  selfieUrl?: string;

  @IsOptional()
  @IsEnum(EstadoKyc)
  estadoVerificacao?: EstadoKyc;

  @IsOptional()
  @IsDateString()
  verificadoEm?: Date;
}
