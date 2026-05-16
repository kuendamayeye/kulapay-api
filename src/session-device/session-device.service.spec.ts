import { Test, TestingModule } from '@nestjs/testing';
import { SessionDeviceService } from './session-device.service';

describe('SessionDeviceService', () => {
  let service: SessionDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionDeviceService],
    }).compile();

    service = module.get<SessionDeviceService>(SessionDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
