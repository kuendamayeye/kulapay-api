import { Test, TestingModule } from '@nestjs/testing';
import { SessionDeviceController } from './session-device.controller';
import { SessionDeviceService } from './session-device.service';

describe('SessionDeviceController', () => {
  let controller: SessionDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionDeviceController],
      providers: [SessionDeviceService],
    }).compile();

    controller = module.get<SessionDeviceController>(SessionDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
