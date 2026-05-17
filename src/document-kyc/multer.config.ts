import { memoryStorage } from 'multer';

export const multerConfig = {
  storage: memoryStorage(), // necessário para Supabase
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
