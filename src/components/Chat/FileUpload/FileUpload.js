import React, {useEffect, useState} from 'react';
import {ref as storageRef, getDownloadURL} from 'firebase/storage';
import {addDoc} from 'firebase/firestore';
import {useUploadFile } from 'react-firebase-hooks/storage';
import styles from './styles.module.css';

function FileUpload({storage, collectionRef, username, userID, userPhoto}) {
    const [file, setFile] = useState([]);
    const [uploadFile] = useUploadFile();

    const openFileExplorer = (e) => {
        let fileInput = document.querySelector("#files");
        fileInput.click();        
    }

    async function sendMessage ()  {
        const currentDate = new Date();
        const millisecondsSince1970 = currentDate.getTime();                //im using this function to order the messages by the time they were created
        const readableDate = currentDate.toDateString();
        const hour = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" + seconds;
        const ref = storageRef(storage, "/" + userID + "/" + file[0].name);
        const url = await getDownloadURL(ref);
        await addDoc(collectionRef, {name: username, userID: userID, photo: userPhoto, 
            message: url, timeStamp: messageEntered, createdAt: millisecondsSince1970});
    }

    useEffect(() => {
        if(file.length > 0){
            (async function storeFile () {
                const button = document.querySelector("." + styles.uploadButton);
                try {    
                    button.disabled = true;
                    const ref = storageRef(storage, "/" + userID + "/" + file[0].name);
                    await uploadFile(ref, file[0]); 
                    sendMessage();
                }
                catch(error){
                    button.disabled = false;
                    console.log(error);
                }
                finally{
                    setTimeout(() => {
                        button.disabled = false;
                    }, 5000)                    
                }
            }) ();            
        }
    },[file])

    useEffect(() => {
        setTimeout(() => {
            let chatBox = document.querySelector("#chatbox");
            chatBox.scrollTop +=  chatBox.scrollHeight;              
        }, 1000) 
    })
    
    return(                
        <button className={styles.uploadButton} onClick={openFileExplorer}>
            Upload
            <input type="file" hidden accept="image/*" onChange={(e) => {setFile(e.target.files)}} id="files"/>
        </button>
    )
}

export default FileUpload;