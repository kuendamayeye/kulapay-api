import { PartialType } from '@nestjs/swagger';
import { CreateDocumentKycDto } from './create-document-kyc.dto';

export class UpdateDocumentKycDto extends PartialType(CreateDocumentKycDto) {}
