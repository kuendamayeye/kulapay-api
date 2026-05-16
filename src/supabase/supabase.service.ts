// src/supabase/supabase.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new InternalServerErrorException(
        'Variáveis do Supabase não configuradas',
      );
    }

    this.supabase = createClient(url, key);
  }

  /*async uploadMedReport(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string,
  ) {
    const { data, error } = await this.supabase.storage
      .from('laudos') // nome do bucket
      .createSignedUrl(fileName, 60 * 60)
      .upload(fileName, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('Erro ao fazer upload do laudo:', error);
      throw new Error('Erro ao enviar o laudo para o armazenamento');
    }

    // 🔗 Recupera URL pública ou assinada
    const { data: publicUrl } = this.supabase.storage
      .from('laudos')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  }*/

  async uploadMedReport(
    fileBuffer: Buffer,
    filePath: string,
    contentType: string,
  ) {
    const { data, error } = await this.supabase.storage
      .from('fotos')
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('❌ Erro ao fazer upload no Supabase:', error.message);
      throw new Error('Falha ao enviar o laudo para o armazenamento.');
    }

    // Gera URL pública ou assinada
    const { data: signedUrl } = await this.supabase.storage
      .from('fotos')
      .createSignedUrl(filePath, 60 * 60 * 24); // 24h

    return signedUrl.signedUrl;
  }

  async downloadFile(filePath: string) {
    const { data, error } = await this.supabase.storage
      .from('laudos')
      .download(filePath);

    if (error) {
      console.error('Erro ao baixar arquivo do Supabase:', error.message);
      throw new Error('Falha ao obter arquivo do Supabase.');
    }

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      buffer,
      name: filePath.split('/').pop(),
      mimeType: this.getMimeType(filePath),
    };
  }

  private getMimeType(filePath: string): string {
    if (filePath.endsWith('.pdf')) return 'application/pdf';
    if (filePath.endsWith('.docx'))
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (filePath.endsWith('.png')) return 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg'))
      return 'image/jpeg';
    return 'application/octet-stream';
  }
}
