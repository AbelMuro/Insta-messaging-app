import React from 'react';
import {auth} from '../firebase-config';
import {useSignInWithGoogle, useSignInWithMicrosoft} from 'react-firebase-hooks/auth';
import styles from './styles.module.css';
import googleIcon from './images/google icon.png';
import microsoftIcon from './images/microsoft logo.png';

function SignIn() {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithMicrosoft] = useSignInWithMicrosoft(auth);

    const handleGoogle = async () => {
        try{
            await signInWithGoogle(); 
        }
        catch(error){
            console.log(error);
        }
    }

    const handleApple = async () => {
        try{
            await signInWithMicrosoft();
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
                    <p className={styles.desc}>Sign in with Google</p>
                </button>   
                <button className={styles.signInButton} onClick={handleApple}>
                    <img src={microsoftIcon} className={styles.microsoftIcon}/>
                    <p className={styles.desc}>Sign in with Microsoft</p>
                </button>            
            </div>
        </section>
    )
}

export default SignIn;