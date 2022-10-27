import React from 'react';
import {db} from './firebase-config';
import {collection, addDoc ,orderBy, limit, query} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {v4 as uuid} from 'uuid';
import './styles.css';


function App(){
    const collectionRef = collection(db, "messages");
    //TODO: find a property that you can use to order all the documents in the collection
    const q = query(collectionRef, orderBy("message"), limit(25)); 

    const [messages, loading, error] = useCollectionData(q);

    const sendMessage = async () => {
        try{
            console.log()
            const currentDate = new Date();
            const readableDate = currentDate.toDateString();
            const hour = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const messageEntered = readableDate + ", Hour:" + hour + " Minutes:" + minutes + " Seconds:" +  seconds;
            let input = document.querySelector(".input");
            const docRef = await addDoc(collectionRef, {message: input.value, timeStamp: messageEntered})
        }
        catch(error){
            console.log(error)
        }
    }

    const handleClick = (e) => {
        e.target.value = "";
    }

    return loading ? (<>...is loading</>) : (
        <main>
            <div className={"chatBox"}>
            {messages.map((message) => {
                return (
                    <div key={uuid()}>
                        <p className={"chatBubbles"}>{message.message}</p>
                        <br/>
                    </div>
                )
            })}                
            </div>

            <div className={"inputContainer"}>
                <input type="text" className={"input"} defaultValue={"Enter message here..."} onClick={handleClick}/>
                <button onClick={sendMessage} className={"sendMessage"}>Send Message</button>                
            </div>

        </main>
        )
}

export default App;