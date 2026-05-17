import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentKycService } from './document-kyc.service';
import { CreateDocumentKycDto } from './dto/create-document-kyc.dto';
import { UpdateDocumentKycDto } from './dto/update-document-kyc.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('documentos')
export class DocumentKycController {
  constructor(private readonly documentKycService: DocumentKycService) {}

  @Post('upload-bi')
  @UseInterceptors(FilesInterceptor('files', 3))
  async uploadBI(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('utilizadorId') utilizadorId: string,
    @Body('numeroDocumento') numeroDocumento: string,
    @Body('tipoDocumento') tipoDocumento: string,
  ) {
    return this.documentKycService.uploadBI(
      files,
      utilizadorId,
      numeroDocumento,
      tipoDocumento,
    );
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
