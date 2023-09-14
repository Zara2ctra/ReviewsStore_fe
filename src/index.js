import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import User from "./reviewsStore/User";
import Review from "./reviewsStore/Review";
import "./i18n";
import './index.css';

export const Context = createContext(null);


const root = createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new User(),
        review: new Review()
    }}>
        <App/>
    </Context.Provider>
)
