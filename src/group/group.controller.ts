import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('grupos')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Post()
  criarGrupo(@Body() body: any) {
    return this.groupService.criarGrupo(body);
  }

  @Get()
  listarGrupos() {
    return this.groupService.listarGrupos();
  }

  @Get(':id')
  obterGrupo(@Param('id') id: string) {
    return this.groupService.obterGrupo(id);
  }

  /*@Post()
  addMembro(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.addMember(createGroupDto.id);
  }*/

  /*@Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }*/
}
