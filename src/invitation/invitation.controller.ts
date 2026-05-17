import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  convidar(@Body() body: any) {
    return this.invitationService.convidar(body);
  }

  @Patch('aceitar/:token')
  aceitarConvite(
    @Param('token') token: string,
    @Body('utilizadorId')
    utilizadorId: string,
  ) {
    return this.invitationService.aceitarConvite(token, utilizadorId);
  }

  @Get()
  findAll() {
    return 'Listar convites';
  }
}
