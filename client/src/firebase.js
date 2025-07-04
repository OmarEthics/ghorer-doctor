import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAN5AxwV7YJfD5ZgEGuIF2sPSqs2Xd8Ujk",
  authDomain: "ghorer-doctor.firebaseapp.com",
  projectId: "ghorer-doctor",
  storageBucket: "ghorer-doctor.firebasestorage.app",
  messagingSenderId: "436661384280",
  appId: "1:436661384280:web:76eec4973ba2fd22eb862d"
};

const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };