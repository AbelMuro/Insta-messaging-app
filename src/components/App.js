import React from 'react';
import Chat from './Chat';
import SignIn from './SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase-config';
import './styles.css';


function App(){
    const [user] = useAuthState(auth);

    return  (
        <>
            {user ? <Chat/> : <SignIn/>}
        </>
    )
}

export default App;