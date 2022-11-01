import React from 'react';
import {auth, db} from '../firebase-config';

import {useSignInWithGoogle, useSignInWithFacebook, useSignInWithMicrosoft} from 'react-firebase-hooks/auth';
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
                message: " has connected the chat", timeStamp: messageEntered, createdAt: millisecondsSince1970, loggedInMessage: " has connected the chat"})
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
                 message: " has connected the chat", timeStamp: messageEntered, createdAt: millisecondsSince1970, loggedInMessage: " has connected the chat" })
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
            await addDoc(collectionRef, { name: currentUser.displayName, userID: currentUser.uid, photo: currentUser.photoURL,
                 message: "", timeStamp: messageEntered, createdAt: millisecondsSince1970, loggedInMessage: " has connected the chat"})
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
                    Welcome to my app! This is a live streaming chat 
                    that anyone can use to send messages or upload images.
                    Please be respectful of each other. Enjoy!
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