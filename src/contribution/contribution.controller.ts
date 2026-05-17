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
  contribuir(@Body() body: any) {
    return this.contributionService.contribuir(body);
  }

  @Get('grupo/:grupoId')
  listarContribuicoes(@Param('grupoId') grupoId: string) {
    return this.contributionService.listarContribuicoes(grupoId);
  }

  @Get('utilizador/:id')
  findByUser(@Param('id') id: string) {
    return `Contribuições do utilizador ${id}`;
  }
}
