import React from 'react';
import {auth, db} from '../firebase-config';

import {useSignInWithGoogle, useSignInWithFacebook, useSignInWithMicrosoft} from 'react-firebase-hooks/auth';
import { FacebookAuthProvider, signInWithPopup, OAuthProvider} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';

import styles from './styles.module.css';
import googleIcon from './images/google icon.png';
import microsoftIcon from './images/microsoft logo.png';
import facebookIcon from './images/facebook.png';

function SignIn() {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithFacebook] = useSignInWithFacebook(auth);
    const [signInWithMicrosoft] = useSignInWithMicrosoft(auth);

    const handleGoogle = async () => {
        try{
           const currentDate = new Date();
           const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
           const readableDate = currentDate.toDateString();
           const hour = currentDate.getHours();
           const minutes = currentDate.getMinutes();
           const seconds = currentDate.getSeconds();
           const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
           const collectionRef = collection(db, "messages");
           await signInWithGoogle();
           const currentUser = auth.currentUser;
           await addDoc(collectionRef, { name: currentUser.displayName, userID: currentUser.uid, photo: currentUser.photoURL,
                message: " has connected the chat", timeStamp: messageEntered, createdAt: millisecondsSince1970})
        }
        catch(error){
            console.log(error);
        }
    }

    const handleFacebook = async () => {
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
            const collectionRef = collection(db, "messages");
            await signInWithFacebook();
            const currentUser = auth.currentUser;
            await addDoc(collectionRef, { name: currentUser.displayName, userID: currentUser.uid, photo: currentUser.photoURL,
                 message: " has connected the chat", timeStamp: messageEntered, createdAt: millisecondsSince1970})
        }
        catch(error){
            console.log(error);
        }
    }

    const handleMicrosoft = async () => {
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();                
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
            const collectionRef = collection(db, "messages");
            await signInWithMicrosoft("", {tenant: "9376f0e7-1c43-470a-aaea-06f6e6e413da" });
            const currentUser = auth.currentUser;
            let userPhoto;
            if(currentUser.photoURL)
                userPhoto = currentUser.photoURL
            else
                userPhoto = "http://dummyimage.com/100x100.png/ff4444/ffffff"
            await addDoc(collectionRef, { name: currentUser.displayName, userID: currentUser.uid, photo: userPhoto,
                 message: " has connected the chat", timeStamp: messageEntered, createdAt: millisecondsSince1970})
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <section className={styles.background}>
            <div className={styles.signInBox}>
                <h1 className={styles.title}>
                    Insta Chatter Box!
                </h1>
                <p className={styles.desc}>
                    This app will enable you to send messages,
                    but you must first sign in with your google 
                    or Microsoft account. Keep in mind that if your
                    google account is already logged in, 
                    The buttons below will automatically direct you 
                    to the chat. 
                </p>
                <button className={styles.signInButton} onClick={handleGoogle}>
                    <img src={googleIcon} className={styles.googleIcon}/>
                    <p className={styles.buttonDesc}>Sign in with Google</p>
                </button>   
                <button className={styles.signInButton} onClick={handleFacebook}>
                    <img src={facebookIcon} className={styles.facebookIcon}/>
                    <p className={styles.buttonDesc}>Sign in with Facebook</p>
                </button>    
                <button className={styles.signInButton} onClick={handleMicrosoft}>
                    <img src={microsoftIcon} className={styles.microsoftIcon}/>
                    <p className={styles.buttonDesc}>Sign in with Microsoft</p>
                </button>    

            </div>
        </section>
    )
}

export default SignIn;