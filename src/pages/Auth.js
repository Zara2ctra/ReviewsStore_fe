import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const {t, i18n} = useTranslation();
    const themeColors = user.themeColors;
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, name)
            }
            user.setId(data?.id);
            user.setUser(user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

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
                style={{width: 600, color: themeColors.text, backgroundColor: themeColors.background,}}
                className="p-5"
            >
                <h2 className="m-auto">{isLogin ? t("Authorization") : t("Registration")}</h2>
                <Form className="d-flex flex-column" data-bs-theme={user.themeMode}>
                    {isLogin ?
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder={t("Enter your email address...")}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={t("Enter your password...")}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </div>
                        :
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder={t("Enter your email address...")}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={t("Enter your password...")}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={t("Enter your name...")}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    }
                    <Row className="d-flex justify-content-between mt-3" style={{width: "70%"}}>
                        {isLogin ?
                            <div>
                                {t("No account?")} <NavLink
                                to={REGISTRATION_ROUTE}
                                style={{color: themeColors.text}}
                            >
                                {t('Sign up')}
                            </NavLink>
                            </div>
                            :
                            <div>
                                {t("Got an account?")} <NavLink
                                to={LOGIN_ROUTE}
                                style={{color: themeColors.text}}
                            >
                                {t('Log in')}
                            </NavLink>
                            </div>
                        }
                        <div>
                            <Button
                                className="mt-3"
                                onClick={click}
                                variant={user.themeMode}
                            >
                                {isLogin ? t('Log in') : t('Sign up')}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
});

export default Auth;