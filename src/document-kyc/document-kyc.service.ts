import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentKycDto } from './dto/create-document-kyc.dto';
import { UpdateDocumentKycDto } from './dto/update-document-kyc.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class DocumentKycService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  async uploadBI(
    files: Express.Multer.File[],
    utilizadorId: string,
    numeroBI: string,
    tipoDocumento: string,
  ) {
    const frente = files[0];
    const verso = files[1];
    const selfie = files[2];

    const timestamp = Date.now();

    // 📤 Upload BI Frente
    const frenteUrl = await this.supabase.uploadFile(
      'kyc-documents',
      `bi/frente/${utilizadorId}-${timestamp}.jpg`,
      frente,
    );

    // 📤 Upload BI Verso
    const versoUrl = await this.supabase.uploadFile(
      'kyc-documents',
      `bi/verso/${utilizadorId}-${timestamp}.jpg`,
      verso,
    );

    // 📤 Upload Selfie
    const selfieUrl = await this.supabase.uploadFile(
      'kyc-documents',
      `selfies/${utilizadorId}-${timestamp}.jpg`,
      selfie,
    );

    // 👤 Atualizar foto do utilizador
    await this.prisma.utilizador.update({
      where: { id: utilizadorId },
      data: {
        fotoPerfilUrl: selfieUrl,
      },
    });

    // 📄 Criar documento KYC
    return this.prisma.documentoKyc.create({
      data: {
        utilizadorId,
        tipoDocumento: 'BI',
        numeroDocumento: numeroBI,
        frenteDocumentoUrl: frenteUrl,
        versoDocumentoUrl: versoUrl,
        selfieUrl,
      },
    });
  }

  async create(createDocumentKycDto: CreateDocumentKycDto) {
    const documentoKyc = await this.prisma.documentoKyc.create({
      data: createDocumentKycDto,
    });

    return documentoKyc;
  }

  async findAll() {
    const documentoKycs = await this.prisma.documentoKyc.findMany();

    return documentoKycs;
  }

  async findOne(id: string) {
    const documentoKyc = await this.prisma.documentoKyc.findUnique({
      where: {
        id,
      },
    });

    if (!documentoKyc) {
      throw new NotFoundException(`DocumentKyc com ID "${id}" não encontrada`);
    }

    return documentoKyc;
  }

  async update(id: string, updateDocumentKycDto: UpdateDocumentKycDto) {
    const documentoKyc = await this.prisma.documentoKyc.update({
      where: { id },
      data: updateDocumentKycDto,
    });
    return documentoKyc;
  }

  async remove(id: string) {
    const documentoKyc = await this.prisma.documentoKyc.findUnique({
      where: {
        id,
      },
    });

    if (!documentoKyc) {
      throw new NotFoundException(`DocumentKyc com ID "${id}" não encontrada`);
    }

    await this.prisma.documentoKyc.delete({
      where: { id },
    });

    return `DocumentKyc removida com sucesso`;
  }
}
