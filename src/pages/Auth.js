import React, {useContext, useEffect, useRef, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE,} from "../utils/consts";
import {getAccessTokenGithub, getUserDataGithub, getUserDataGoogle, login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import AuthForm from "../components/AuthForm";
import {setUserAuth} from "../utils/utils";


const Auth = observer(() => {
    const {user} = useContext(Context);
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const loginWith = useRef(localStorage.getItem("loginWith"))
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        err: "",
    });
    const [showErr, setShowErr] = useState(false);

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const codeParam = urlParams.get("code")
        const accessToken = localStorage.getItem("accessToken");

        async function fetchGithubData() {
            if (codeParam && loginWith.current === "GitHub" && !user.id) {
                let data;

                if (accessToken) {
                    data = await getUserDataGithub(accessToken);
                } else {
                    const resp = await getAccessTokenGithub(codeParam);
                    data = await getUserDataGithub(resp.access_token);
                }

                await setUserAuth(user, data);
                localStorage.removeItem("accessToken");
                navigate(MAIN_ROUTE);
            }
        }

        async function fetchGoogleData() {
            if (accessToken && loginWith.current === 'Google' && !user.id) {
                const data = await getUserDataGoogle(accessToken);
                await setUserAuth(user, data);
                localStorage.removeItem("accessToken");
                navigate(MAIN_ROUTE);
            }
        }

        codeParam ? fetchGithubData() : fetchGoogleData()
    }, [loginWith])


    const handleSubmit = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(formData.email, formData.password);
            } else {
                data = await registration(formData.email, formData.password, formData.name);
            }
            if (data) {
                setUserAuth(user, data).then(() => navigate(MAIN_ROUTE))
            }
        } catch (e) {
            const textErr = t(e.response.data.message)
           setFormData({
               ...formData,
               err: textErr
           });
           setShowErr(true)
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{
                height: window.innerHeight - 54,
                backgroundColor: themeColors.background,
                color: themeColors.text,
            }}
        >
            <Card
                style={{
                    width: 600,
                    color: themeColors.text,
                    backgroundColor: themeColors.background,
                }}
                className="p-5"
            >
                <Card.Title className="m-auto" style={{fontSize: "3rem"}}>
                    {isLogin ? t("Authorization") : t("Registration")}
                </Card.Title>
                <AuthForm
                    isLogin={isLogin}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setShowErr={setShowErr}
                    showErr={showErr}
                    themeColors={themeColors}
                    themeMode={themeMode}
                    navigate={navigate}
                />
            </Card>
        </Container>
    )
});

export default Auth;