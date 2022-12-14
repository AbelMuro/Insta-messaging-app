import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCBzB5AiIrys1AssoD4LsvXudSt8ShbC_k",
    authDomain: "insta-messaging-app.firebaseapp.com",
    projectId: "insta-messaging-app",
    storageBucket: "insta-messaging-app.appspot.com",
    messagingSenderId: "469261773625",
    appId: "1:469261773625:web:8a85558c732d9109f6d6e8",
    measurementId: "G-KSF6FSJC0N"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);





