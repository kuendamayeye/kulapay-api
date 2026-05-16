import { Test, TestingModule } from '@nestjs/testing';
import { DocumentKycService } from './document-kyc.service';

describe('DocumentKycService', () => {
  let service: DocumentKycService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentKycService],
    }).compile();

    service = module.get<DocumentKycService>(DocumentKycService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
