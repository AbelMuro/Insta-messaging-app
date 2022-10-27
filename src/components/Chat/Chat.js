import React from 'react';
import {db} from '../firebase-config';
import {collection, addDoc ,orderBy, limit, query} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {v4 as uuid} from 'uuid';
import styles from './styles.module.css'

function Chat() {
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("createdAt"), limit(25)); 
    const [messages, loading, error] = useCollectionData(q);

    const sendMessage = async () => {
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" +  seconds;
            let input = document.querySelector("." + styles.input);
            await addDoc(collectionRef, {message: input.value, timeStamp: messageEntered, createdAt: millisecondsSince1970});
        }
        catch(error){
            console.log(error);
        }
    }

    const handleClick = (e) => {
        e.target.value = "";
    }

    return loading ? (<>...is loading</>) : (
        <main>
            <div className={styles.chatBox}>
            {messages.map((message) => {
                return (
                    <div key={uuid()}>
                        <p className={styles.chatBubbles}>{message.message}</p>
                        <br/>
                    </div>
                )
            })}                
            </div>

            <div className={styles.inputContainer}>
                <input type="text" className={styles.input} defaultValue={"Enter message here..."} onClick={handleClick}/>
                <button onClick={sendMessage} className={styles.sendMessage}>Send Message</button>                
            </div>
        </main>
    )
} 

export default Chat;