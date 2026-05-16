import { Module } from '@nestjs/common';
import { DocumentKycService } from './document-kyc.service';
import { DocumentKycController } from './document-kyc.controller';

@Module({
  controllers: [DocumentKycController],
  providers: [DocumentKycService],
})
export class DocumentKycModule {}
