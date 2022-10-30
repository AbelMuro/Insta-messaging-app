import React, {useEffect, useState, useRef} from 'react';
import FileUpload from './FileUpload';
import {auth, storage, db} from '../firebase-config';

import {collection, addDoc ,orderBy, query} from 'firebase/firestore';
import {onAuthStateChanged, signOut} from 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {v4 as uuid} from 'uuid';
import styles from './styles.module.css';


function Chat() {
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [, forceRender] = useState(0);
    const disable = useRef(false);
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("createdAt")); 
    const [messages, loading] = useCollectionData(q);

    const handleClick = (e) => {
        e.target.value = "";
    }

    const logOut = () => {
        signOut(auth);
    }


    const sendMessage = async () => {
        let inputBox = document.querySelector("." + styles.input);
        if(inputBox.value == "") {
            alert("Please enter a message");
            return;
        }
        disable.current = true
        try{
            const currentDate = new Date();
            const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
            const input = document.querySelector("." + styles.input);
            await addDoc(collectionRef, {name: username, userID: userID, photo: userPhoto, 
                message: input.value, timeStamp: messageEntered, createdAt: millisecondsSince1970});
        }
        catch(error){
            console.log(error);
        }
        finally{
            setTimeout(() => {
                disable.current = false;
                forceRender((prevState) => {
                    return prevState + 0.000001;
                });
            }, 5000)
        }
    }

    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser != null){
            let name = currentUser.displayName;
            let id = currentUser.uid;
            let photo;
            if(currentUser.photoURL)
                photo = currentUser.photoURL;
            else
                photo = "http://dummyimage.com/100x100.png/ff4444/ffffff"          
            setUsername(name);
            setUserID(id);
            setUserPhoto(photo);
        }
    })


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
    },)

    useEffect(() => {
        if(!loading){
            let chatBox = document.querySelector("." + styles.chatBox);
            chatBox.scrollTop += chatBox.getBoundingClientRect().height;              
        }
    },[loading])

    //TODO: decide to display a <img> tag if the message contains a URL or display a <p> if the message contains a string
    return loading ? (<>...is loading</>) : (
        <main>
            <div className={styles.chatBox}>
                {messages.map((message) => {
                    let name = message.name;
                    let messageID = message.userID;
                    let photo = message.photo;     
                    let leftOrRight;    

                    if(messageID == userID)
                        leftOrRight = styles.messageContainerToTheLeft;
                    else
                        leftOrRight = styles.messageContainerToTheRight;
                    return ( 
                        <div key={uuid()} className={leftOrRight}>
                            <img src={photo} className={styles.userPhoto} />
                            <div className={styles.chatBubbles}>
                                <p className={styles.userSaid}>
                                    {name + " said:"}
                                </p>
                                {message.message}
                            </div>                          
                        </div>
                        )                            
                    })}   
            </div>

            <div className={styles.inputContainer}>
                <input type="text" className={styles.input} defaultValue={"Enter message here..."} onClick={handleClick}/>
                <button disabled={disable.current} onClick={sendMessage} className={styles.sendMessage} title={"You can press enter to send a message"}>Send Message</button>   
                <FileUpload storage={storage} username={username} userID={userID} userPhoto={userPhoto} collectionRef={collectionRef} />
            </div>
        </main>
    )
} 

export default Chat;

//<button onClick={logOut} className={styles.logoutButton} title={"This will redirect you to the login page"}>Sign out</button>        