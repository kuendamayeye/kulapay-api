import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { CanalNotificacao, EstadoNotificacao } from '@prisma/client';

export class CreateNotificationDto {
  @IsUUID()
  utilizadorId: string;

  @IsString()
  tipo: string;

  @IsString()
  titulo: string;

  @IsString()
  mensagem: string;

  @IsEnum(CanalNotificacao)
  canal: CanalNotificacao;

  @IsOptional()
  @IsEnum(EstadoNotificacao)
  estado?: EstadoNotificacao;
}
