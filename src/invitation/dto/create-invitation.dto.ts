import { IsDateString, IsOptional, IsString } from 'class-validator';
import { EstadoConvite } from '@prisma/client';

export class CreateInvitationDto {
  @IsString()
  grupoId: string;

  @IsString()
  convidadoPorId: string;

  @IsOptional()
  @IsString()
  utilizadorConvidadoId?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsString()
  token: string;

  @IsString()
  estado: EstadoConvite;

  @IsDateString()
  expiraEm: string;
}
