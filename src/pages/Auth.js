import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import AuthForm from "../components/AuthForm";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        try {
            let data;
            if (isLogin) {
                data = await login(formData.email, formData.password);
            } else {
                data = await registration(formData.email, formData.password, formData.name);
            }
            user.setId(data?.id);
            user.setUser(user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
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
                />
            </Card>
        </Container>
    )
});

export default Auth;