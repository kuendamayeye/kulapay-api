import { IsEnum, IsInt, IsString } from 'class-validator';
import { EstadoMembro } from '@prisma/client';

export class CreateGroupMemberDto {
  @IsString()
  utilizadorId: string;

  @IsString()
  grupoId: string;

  @IsInt()
  ordemRecebimento: number;

  @IsEnum(EstadoMembro)
  estado: EstadoMembro;
}
