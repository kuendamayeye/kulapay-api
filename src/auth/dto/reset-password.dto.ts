import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  resetToken: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caraceteres' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'A senha deve conter pelo menos um número',
  })
  newPassword: string;
}
