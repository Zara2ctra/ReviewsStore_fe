import React, {useContext, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar.js";
import {Context} from "./index";
import {darkThemeColors, lightThemeColors} from "./utils/consts";

const App = observer(() => {
    const {user} = useContext(Context);
    useEffect(() => {
        document.body.style.backgroundColor = user.themeMode === 'dark' ?
            darkThemeColors.background
            :
            lightThemeColors.background;
    }, [user.themeMode]);

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;