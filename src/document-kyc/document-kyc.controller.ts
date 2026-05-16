import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentKycService } from './document-kyc.service';
import { CreateDocumentKycDto } from './dto/create-document-kyc.dto';
import { UpdateDocumentKycDto } from './dto/update-document-kyc.dto';

@Controller('documentos')
export class DocumentKycController {
  constructor(private readonly documentKycService: DocumentKycService) {}

  @Post()
  create(@Body() createDocumentKycDto: CreateDocumentKycDto) {
    return this.documentKycService.create(createDocumentKycDto);
  }

  @Get()
  findAll() {
    return this.documentKycService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentKycService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentKycDto: UpdateDocumentKycDto,
  ) {
    return this.documentKycService.update(id, updateDocumentKycDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentKycService.remove(id);
  }
}
