import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { FrequenciaCiclo } from '@prisma/client';

export class CreateGroupDto {
  @IsString()
  grupoId: string;

  @IsString()
  utilizadorId: string;
}
