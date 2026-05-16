import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMerchantDto {
  @IsUUID()
  utilizadorId: string;

  @IsString()
  nomeNegocio: string;

  @IsOptional()
  @IsString()
  tipoNegocio?: string;

  @IsString()
  codigoComerciante: string;

  @IsOptional()
  @IsString()
  qrCode?: string;

  @IsString()
  estado: string;
}
