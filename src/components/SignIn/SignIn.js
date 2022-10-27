import React from 'react';
import {auth} from '../firebase-config';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';

function SignIn() {
    const navigate = useNavigate();

    return(
        <section className={styles.background}>
            <div className={styles.signInBox}>
                <h1 className={styles.title}>
                    Welcome to Insta Chatter Box!
                </h1>
                <p className={styles.desc}>
                    This app will enable you to send messages 
                </p>
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} />                    
                </div>

            </div>
        </section>
    )
}

export default SignIn;