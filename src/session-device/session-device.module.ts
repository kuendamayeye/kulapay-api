import { Module } from '@nestjs/common';
import { SessionDeviceService } from './session-device.service';
import { SessionDeviceController } from './session-device.controller';

@Module({
  controllers: [SessionDeviceController],
  providers: [SessionDeviceService],
})
export class SessionDeviceModule {}
