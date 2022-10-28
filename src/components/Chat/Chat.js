import React, {useEffect, useState} from 'react';
import {db} from '../firebase-config';
import {collection, addDoc ,orderBy, limit, query} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {v4 as uuid} from 'uuid';
import styles from './styles.module.css'

function Chat() {
    const [username, setUsername] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const messageBox = [];
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("createdAt")); 
    const [messages, loading] = useCollectionData(q);


    const handleClick = (e) => {
        e.target.value = "";
    }

    const logOut = () => {
        signOut(auth);
    }

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser != null){
            let name = currentUser.displayName;
            let photo = currentUser.photoURL;
            setUsername(name);
            setUserPhoto(photo);
        }
    })

    const sendMessage = async () => {  
        let inputBox = document.querySelector("." + styles.input);
        if(inputBox.value == "") {
            alert("Please enter a message");
            return;
        }
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
            const input = document.querySelector("." + styles.input);
            await addDoc(collectionRef, {name: username, photo: userPhoto, message: input.value, timeStamp: messageEntered, createdAt: millisecondsSince1970});
        }
        catch(error){
            console.log(error);
        }
    }



    if(!loading){
        messages.map((message) => {
            if(message.name == username){
                messageBox.push( 
                <div key={uuid()} className={styles.messageContainerToTheLeft}>
                    <img src={userPhoto} className={styles.userPhoto} />
                    <div className={styles.chatBubbles}>
                        <p className={styles.userSaid}>
                            {username + " said:"}
                        </p>
                        {message.message}
                    </div>                          
                </div>)
            }
            else {
                messageBox.push( 
                    <div key={uuid()} className={styles.messageContainerToTheRight}>
                        <img src={userPhoto} className={styles.userPhoto} />
                        <div className={styles.chatBubbles}>
                            <p className={styles.userSaid}>
                                {username + " said:"}
                            </p>
                            {message.message}
                        </div>                          
                    </div>)
            }
        })
    }

    useEffect(() => {
        const keyboardHandler = (e) => {
            let keyPressed = e.key;
            if(keyPressed == "Enter"){
                let sendMessage = document.querySelector("." + styles.sendMessage);
                let inputBox = document.querySelector("." + styles.input);             
                sendMessage.click();               
                inputBox.value = "";              

            }
        }
        document.addEventListener("keydown", keyboardHandler)
        return () => {
            document.removeEventListener("keydown", keyboardHandler)
        }
    })

    useEffect(() => {
        if(!loading){
            let chatBox = document.querySelector("." + styles.chatBox);
            chatBox.scrollTop += chatBox.getBoundingClientRect().height;              
        }

    })


    return loading ? (<>...is loading</>) : (
        <main>
            <div className={styles.chatBox}>
                {messageBox}                
            </div>

            <div className={styles.inputContainer}>
                <input type="text" className={styles.input} defaultValue={"Enter message here..."} onClick={handleClick}/>
                <button onClick={sendMessage} className={styles.sendMessage}>Send Message</button>   
                <button onClick={logOut} className={styles.logoutButton}>Sign out</button>             
            </div>
        </main>
    )
} 

export default Chat;