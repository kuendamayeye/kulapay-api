import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

export class CreatePaymentCalendarDto {
  @IsString()
  grupoId: string;

  @IsString()
  membroId: string;

  @IsInt()
  numeroCiclo: number;

  @IsDateString()
  dataPrevista: string;

  @IsBoolean()
  pago: boolean;
}
