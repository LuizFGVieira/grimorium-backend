import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';

@Injectable()
export class FirebaseService {
  private readonly firebaseApp;
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    this.firebaseApp = initializeApp(firebaseConfig);
  }

  public getFirebaseApp() {
    return this.firebaseApp;
  }
}
