import { IsNumber, IsUUID } from 'class-validator';

export class CreateCreditPaymentDto {
  @IsUUID()
  creditoId: string;

  @IsUUID()
  transaccaoId: string;

  @IsNumber()
  valor: number;
}
