import React, {useEffect, useState} from 'react';
import FileUpload from './FileUpload';
import {auth, storage, db} from '../firebase-config';

import {collection, addDoc ,orderBy, query} from 'firebase/firestore';
import {onAuthStateChanged, signOut} from 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {v4 as uuid} from 'uuid';
import styles from './styles.module.css';

import { CircularProgress } from '@mui/material';

function Chat() {
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("createdAt")); 
    const [messages, loading] = useCollectionData(q);

    const handleClick = (e) => {
        e.target.value = "";
    }

    const handleError = (e) => {
        e.target.src = "http://dummyimage.com/100x100.png/ff4444/ffffff";
    }

    const logOut = () => {
        signOut(auth);
    }


    const sendMessage = async () => {
        const inputBox = document.querySelector("." + styles.input);
        const messageButton = document.querySelector("." + styles.sendMessage)
        if(inputBox.value == "") {
            alert("Please enter a message");
            return;
        }
        else if(inputBox.value.length > 200){
            alert("You message can't exceed 200 characters");
            return
        }
        messageButton.disabled = true
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
            inputBox.value = "";    
            setTimeout(() => {
                messageButton.disabled = false;
            }, 3000);
        }
    }

    //using this function to access the credentials of the user
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

    //adding an event listener that will enable the user to send a message by pressing enter
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

    //everytime the user sends a new message, the chat box will automatically scroll down to view the message
    useEffect(() => {
        let chatBox = document.querySelector("#chatbox");
        chatBox.scrollTop += chatBox.scrollHeight;                    //i used a really big number to make sure that the element scrolls down to the bottom to display new message
    
    })

    return (
        <main>
            <nav className={styles.navBar}>
                <p className={styles.logo}>
                    Instant Chatter Box App
                </p>
                <button onClick={logOut} className={styles.logOutButton}>Sign Out</button>
            </nav>
            <div className={styles.chatBox} id="chatbox">
                {loading ? (<div className={styles.loadingContainer}><CircularProgress color="success"/> </div>) : messages.map((message) => {
                    let name = message.name;
                    let messageID = message.userID;
                    let messageSent = message.message;
                    let photo = message.photo;     
                    let leftOrRight; 
                    let chatBubble; 
                    if(messageID == userID){
                        leftOrRight = styles.messageContainerToTheLeft;
                        chatBubble = styles.userChatBubble;
                    }
                    else{
                        leftOrRight = styles.messageContainerToTheRight;
                        chatBubble = styles.otherChatBubble;
                    }    

                    if(!message.hasOwnProperty("loggedInMessage")){
                        return ( 
                            <div key={uuid()} className={leftOrRight}>
                                <img src={photo} className={styles.userPhoto} onError={handleError} alt={"users photo"}/>
                                <div className={chatBubble}>
                                    <p className={styles.userSaid}>
                                        {name + " said:"}
                                    </p>
                                    {messageSent.includes("http") ? <img src={messageSent} className={styles.imageSent} alt={"image sent by user"}/> : messageSent}
                                </div>                          
                            </div>
                        )                           
                    }
                    else{
                        let loggedInMessage = message.loggedInMessage;
                        if(photo == null) photo = "";                       //if photo is null, then it wont trigger the onError event
                            return(
                                <div key={uuid()} className={leftOrRight} >
                                    <img src={photo} className={styles.userPhoto} onError={handleError} alt={"users photo"}/>
                                    <div className={chatBubble}>
                                        {`${name} ${loggedInMessage}`}
                                    </div>                          
                                </div>
                            )
                        }
                })}  
            </div>

            <div className={styles.inputContainer}>
                <input type="text" className={styles.input} defaultValue={"Enter message here..."} onClick={handleClick}/>
                <button onClick={sendMessage} className={styles.sendMessage} title={"You can press enter to send a message"}>Send Message</button>   
                <FileUpload storage={storage} username={username} userID={userID} userPhoto={userPhoto} collectionRef={collectionRef} />
            </div>
        </main>
    )
} 

export default Chat;

