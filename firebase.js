// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA24SjB4duyPj0Hkood67CHP4A0fwR_tFI',
  authDomain: 'supplywave-928b8.firebaseapp.com',
  projectId: 'supplywave-928b8',
  storageBucket: 'supplywave-928b8.appspot.com',
  messagingSenderId: '186576469535',
  appId: '1:186576469535:web:f11885bb2052ce904e5f2a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
