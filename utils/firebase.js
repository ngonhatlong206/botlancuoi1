const admin = require('firebase-admin');

// Khởi tạo Firebase Admin SDK
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }
} catch (error) {
  console.error('[ FIREBASE ] Lỗi kết nối Firebase:', {
    message: error.message,
    stack: error.stack,
    code: error.code,
    error: error
  });
}

const db = admin.firestore();

module.exports = {
  db,
  // Set a document by ID
  async set(collectionName, docId, data) {
    try {
      await db.collection(collectionName).doc(docId).set(data, { merge: true });
      return { success: true, id: docId };
    } catch (error) {
      console.error('Firebase set error:', error);
      return { success: false, error: error.message };
    }
  },
  // Get a document by ID
  async get(collectionName, docId) {
    try {
      const docRef = db.collection(collectionName).doc(docId);
      const docSnap = await docRef.get();
      if (docSnap.exists) return docSnap.data();
      return null;
    } catch (error) {
      console.error('Firebase get error:', error);
      return null;
    }
  },
  // Delete a document by ID
  async del(collectionName, docId) {
    try {
      await db.collection(collectionName).doc(docId).delete();
      return true;
    } catch (error) {
      console.error('Firebase delete error:', error);
      return false;
    }
  },
  // Get all documents in a collection
  async getAll(collectionName) {
    try {
      const snapshot = await db.collection(collectionName).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Firebase getAll error:', error);
      return [];
    }
  }
}; 