import { Test, TestingModule } from '@nestjs/testing';
import { DocumentKycController } from './document-kyc.controller';
import { DocumentKycService } from './document-kyc.service';

describe('DocumentKycController', () => {
  let controller: DocumentKycController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentKycController],
      providers: [DocumentKycService],
    }).compile();

    controller = module.get<DocumentKycController>(DocumentKycController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
