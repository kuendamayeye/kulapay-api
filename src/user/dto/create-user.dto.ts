import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

import { EstadoUsuario } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  nomeCompleto: string;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: Date;

  @IsOptional()
  @IsString()
  numeroDocumento?: string;

  @IsOptional()
  @IsString()
  fotoPerfilUrl?: string;

  @IsString()
  @Length(4, 255)
  pin!: string;

  @IsOptional()
  @IsString()
  idiomaPreferido?: string;

  @IsOptional()
  @IsBoolean()
  verificado?: boolean;

  @IsOptional()
  @IsEnum(EstadoUsuario)
  estado?: EstadoUsuario;
}
