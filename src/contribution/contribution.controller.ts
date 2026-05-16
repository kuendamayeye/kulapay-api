import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post()
  create() {
    return 'Criar contribuição';
  }

  @Get('grupo/:grupoId')
  findByGroup(@Param('grupoId') grupoId: string) {
    return `Contribuições do grupo ${grupoId}`;
  }

  @Get('utilizador/:id')
  findByUser(@Param('id') id: string) {
    return `Contribuições do utilizador ${id}`;
  }
}
