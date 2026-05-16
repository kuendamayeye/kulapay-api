import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionDeviceService } from './session-device.service';
import { CreateSessionDeviceDto } from './dto/create-session-device.dto';
import { UpdateSessionDeviceDto } from './dto/update-session-device.dto';

@Controller('sessoes-dispositivo')
export class SessionDeviceController {
  constructor(private readonly sessionDeviceService: SessionDeviceService) {}

  @Post()
  create(@Body() createSessionDeviceDto: CreateSessionDeviceDto) {
    return this.sessionDeviceService.create(createSessionDeviceDto);
  }

  @Get()
  findAll() {
    return this.sessionDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionDeviceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSessionDeviceDto: UpdateSessionDeviceDto,
  ) {
    return this.sessionDeviceService.update(id, updateSessionDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionDeviceService.remove(id);
  }
}
