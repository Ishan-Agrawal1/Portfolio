import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK with credentials from environment
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Validate that credentials exist
if (!firebaseConfig.projectId || !firebaseConfig.privateKey || !firebaseConfig.clientEmail) {
  console.error('Firebase credentials missing in environment variables!');
  console.error('Required: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL');
  console.warn('Running in demo mode - some features will not work');
}

// Initialize Firebase Admin only if we have real credentials
if (firebaseConfig.projectId && firebaseConfig.privateKey && firebaseConfig.clientEmail) {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        databaseURL: firebaseConfig.databaseURL,
      });
      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Firebase:', error.message);
    }
  }
} else {
  console.log('⏭️  Skipping Firebase initialization - using demo mode');
  // In demo mode, create mock exports
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: 'demo-project',
    });
  }
}

export const db = admin.apps.length > 0 ? admin.firestore() : null;

export default admin;
