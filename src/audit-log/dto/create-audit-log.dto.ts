import { IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuditLogDto {
  @IsOptional()
  @IsUUID()
  utilizadorId?: string;

  @IsString()
  accao: string;

  @IsString()
  tipoEntidade: string;

  @IsUUID()
  entidadeId: string;

  @IsOptional()
  metadados?: any;
}
