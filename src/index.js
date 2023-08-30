import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from "./reviewsStore/User";
import Review from "./reviewsStore/Review";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new User(),
        review: new Review()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);