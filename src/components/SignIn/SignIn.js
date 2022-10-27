import React from 'react';
import {auth} from '../firebase-config';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import googleIcon from './images/google icon.png';
import appleIcon from './images/apple icon.png';

function SignIn() {
    const navigate = useNavigate();

    return(
        <section className={styles.background}>
            <div className={styles.signInBox}>
                <h1 className={styles.title}>
                    Welcome to the Insta Chatter Box!
                </h1>
                <p className={styles.desc}>
                    This app will enable you to send messages,
                    but you must first sign in with your google 
                    or apple account 
                </p>
                <button className={styles.signInButton}>
                    <img src={googleIcon} className={styles.googleIcon}/>
                    <p className={styles.desc}>Sign in with Google</p>
                </button>   
                <button className={styles.signInButton}>
                    <img src={appleIcon} className={styles.appleIcon}/>
                    <p className={styles.desc}>Sign in with Apple</p>
                </button>                
            </div>
        </section>
    )
}

export default SignIn;