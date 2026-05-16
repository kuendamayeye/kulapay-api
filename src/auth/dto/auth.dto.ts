import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
