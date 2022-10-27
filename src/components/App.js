import React from 'react';
import Chat from './Chat';
import SignIn from './SignIn';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles.css';


function App(){


    return  (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SignIn/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>    
            </BrowserRouter>
        </>
    )
}

export default App;