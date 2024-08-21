import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { randomUUID } from 'crypto';
@Injectable()
export class FirebaseStorageService {
  private readonly logger = new Logger(FirebaseStorageService.name);
  private readonly firebaseStorage;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseStorage = getStorage(this.firebaseService.getFirebaseApp());
  }

  public async uploadImage(base64Image: string, path: string): Promise<string> {
    this.logger.debug('Fazendo upload da imagem no Firebase Storage...');
    try {
      const buffer = Buffer.from(base64Image, 'base64');

      const mimeType = base64Image.match(/^data:(.*);base64,/)?.[1];
      const extension = mimeType ? mimeType.split('/')[1] : 'jpg';

      const filePath = `${path}/${randomUUID()}.${extension}`;
      const storageRef = ref(this.firebaseStorage, filePath);

      await uploadBytes(storageRef, buffer);

      return getDownloadURL(storageRef);
    } catch (error) {
      this.logger.error(
        'Falha ao fazer upload da imagem no Firebase Storage...',
        error,
      );
      throw error;
    }
  }
}
