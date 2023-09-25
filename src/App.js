import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {Context} from "./index";
import {check} from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar.js";
import LoadingSpinner from "./components/LoadingSpinner";
import {setBodyBackgroundColor, setUserAuth} from "./utils/utils";
import {GoogleOAuthProvider} from "@react-oauth/google";

const App = observer(() => {
    const {user} = useContext(Context);
    const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(true)
    const themeMode = user.themeMode

    useEffect(() => {
        setBodyBackgroundColor(themeMode);
    }, [themeMode]);

    useEffect(() => {
        check()
            .then(async (data) => {
                await i18n.changeLanguage(localStorage.getItem("lang"));
                setUserAuth(user, data);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <NavBar/>
                {loading ? <LoadingSpinner themeMode={themeMode}/> : <AppRouter/>}
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
});

export default App;