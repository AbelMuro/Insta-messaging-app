import React from 'react';
import {db} from './firebase-config';
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'


function App(){

    async function addDocument () {
        try{
            const newDocument = collection(db, "example")
            await addDoc(newDocument, {
                first: "abel",
                last: "muro",
                born: "july 56"
            });
        }
        catch(error){
            console.log("error");
        }
    };

    (async function replaceDocument() {
        try{
            const newDocument = doc(db, "cities", "LA")
            await setDoc(newDocument, {
                name: "abelito"
            })
        }
        catch(error){
            console.log(error);
        }
    })();



    return(<>hello world</>)
}

export default App;