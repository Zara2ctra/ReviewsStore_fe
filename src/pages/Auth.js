import React, {useContext, useEffect, useRef, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE,} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import AuthForm from "../components/AuthForm";
import {getAccessTokenGithub, getUserDataGithub, getUserDataGoogle} from "../http/authServicesApi";
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
        userDataGithub: [],
        userDataGoogle: [],
    });
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
        if (codeParam && !accessToken && loginWith.current === "GitHub") {
            getAccessTokenGithub(codeParam).then(resp => {
                localStorage.setItem("accessToken", resp.access_token)
                getUserDataGithub(resp.access_token).then((resp) => {
                    setFormData({
                        ...formData,
                        userDataGithub: resp
                    })
                })
            })
        } else if (codeParam && accessToken && loginWith.current === "GitHub") {
            getUserDataGithub(accessToken).then((resp) => {
                localStorage.setItem("accessToken", accessToken)
                setFormData({
                    ...formData,
                    userDataGithub: resp
                })

            })
        }
    }, [loginWith])

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")

        if (accessToken && loginWith.current === "Google") {
            getUserDataGoogle(accessToken).then(resp => {
                setFormData({
                    ...formData,
                    userDataGoogle: resp
                })
            })
        }
    }, [loginWith])


    const handleSubmit = async (event) => {
        try {
            let data;
            if (isLogin) {
                data = await login(formData.email, formData.password);
            } else {
                data = await registration(formData.email, formData.password, formData.name);
            }
            setUserAuth(user, data).then(() => navigate(MAIN_ROUTE))
        } catch (e) {
            console.log(e.response.data.message);
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
                    themeColors={themeColors}
                    themeMode={themeMode}
                    navigate={navigate}
                />
            </Card>
        </Container>
    )
});

export default Auth;