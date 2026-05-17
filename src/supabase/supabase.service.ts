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

  async uploadFile(bucket: string, path: string, file: Express.Multer.File) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrl } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  }
}
