import React, {createContext} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google"
import {createRoot} from 'react-dom/client';
import App from './App';
import User from "./reviewsStore/User";
import "./i18n";
import "./style.css";

export const Context = createContext(null);
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const root = createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new User(),
    }}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App/>
        </GoogleOAuthProvider>
    </Context.Provider>
)
