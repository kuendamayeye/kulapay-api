import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupMemberService } from './group-member.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';

@Controller('membros')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  @Post('entrar')
  join() {
    return 'Entrar no grupo';
  }

  @Post('sair/:id')
  leave(@Param('id') id: string) {
    return `Sair do grupo ${id}`;
  }

  @Get('grupo/:grupoId')
  findByGroup(@Param('grupoId') grupoId: string) {
    return `Membros do grupo ${grupoId}`;
  }
}
