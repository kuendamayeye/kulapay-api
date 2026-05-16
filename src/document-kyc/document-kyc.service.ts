import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentKycDto } from './dto/create-document-kyc.dto';
import { UpdateDocumentKycDto } from './dto/update-document-kyc.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentKycService {
  constructor(private prisma: PrismaService) {}

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
