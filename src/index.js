import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import User from "./reviewsStore/User";
import "./i18n";
import "./style.css";

export const Context = createContext(null);

const root = createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new User(),
    }}>
        <App/>
    </Context.Provider>
)
