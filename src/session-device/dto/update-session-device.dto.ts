import { PartialType } from '@nestjs/swagger';
import { CreateSessionDeviceDto } from './create-session-device.dto';

export class UpdateSessionDeviceDto extends PartialType(CreateSessionDeviceDto) {}
