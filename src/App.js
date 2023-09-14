import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar.js";
import {Context} from "./index";
import {darkThemeColors, lightThemeColors} from "./utils/consts";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userAPI";
import {useTranslation} from "react-i18next";

const App = observer(() => {
    const {user} = useContext(Context);
    const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.body.style.backgroundColor = user.themeMode === 'dark' ?
            darkThemeColors.background
            :
            lightThemeColors.background;
    }, [user.themeMode]);

    useEffect(() => {
        check().then(async data => {
            await i18n.changeLanguage(localStorage.getItem('lang'));
            if (data) {
                user.setId(data.id);
                user.setUser(user);
                user.setIsAuth(true);
            } else {
                user.setId(null);
                user.setUser(null);
                user.setIsAuth(false);
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner
            animation={"grow"}
            variant={user.themeMode}
            style={{margin: "auto"}}
        />
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;