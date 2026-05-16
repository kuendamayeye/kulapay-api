import { IsBoolean, IsIP, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSessionDeviceDto {
  @IsUUID()
  utilizadorId: string;

  @IsString()
  identificadorDispositivo: string;

  @IsOptional()
  @IsString()
  nomeDispositivo?: string;

  @IsOptional()
  @IsIP()
  enderecoIp?: string;

  @IsOptional()
  activa?: boolean;
}
