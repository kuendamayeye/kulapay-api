import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAgentDto {
  @IsUUID()
  utilizadorId: string;

  @IsString()
  nomeNegocio: string;

  @IsString()
  codigoAgente: string;

  @IsOptional()
  @IsNumber()
  saldoOperacional?: number;

  @IsString()
  estado: string;
}
