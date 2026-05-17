import { Module } from '@nestjs/common';
import { DocumentKycService } from './document-kyc.service';
import { DocumentKycController } from './document-kyc.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [DocumentKycController],
  providers: [DocumentKycService, SupabaseService],
})
export class DocumentKycModule {}

export class KycModule {}
