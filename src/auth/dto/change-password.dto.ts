import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  senhaAntiga: string;

  @IsNotEmpty()
  @IsString()
  senhaNova: string;
}
