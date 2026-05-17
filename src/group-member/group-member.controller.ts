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

  @Post()
  entrarGrupo(
    @Body()
    body: {
      utilizadorId: string;
      grupoId: string;
    },
  ) {
    return this.groupMemberService.entrarGrupo(body.utilizadorId, body.grupoId);
  }

  @Get('grupo/:grupoId')
  listarMembros(@Param('grupoId') grupoId: string) {
    return this.groupMemberService.listarMembros(grupoId);
  }

  @Delete(':id')
  removerMembro(@Param('id') id: string) {
    return this.groupMemberService.removerMembro(id);
  }
}
