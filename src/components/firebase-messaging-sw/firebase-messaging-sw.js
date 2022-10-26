import {initializeApp} from 'firebase/app';
import {getMessaging, getToken} from 'firebase/messaging';

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
const messaging = getMessaging(app);
//TODO: find out more about the cloud messaging crap
getToken(messaging, {vapidKey: "BGxR1MBrbeusvsCB1gQthN82JHWL80iHFN2vnt5YndhTrA1sDufS52zdRa4-5kBy0NrvguWZP3SPdkGXUezHXoI"})
.then((currentToken) => {

})


