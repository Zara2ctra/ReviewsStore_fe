import React from 'react';
import {Button, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const AuthForm = ({isLogin, formData, handleChange, handleSubmit, themeColors, themeMode}) => {
    const {t} = useTranslation();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <Form className="d-flex flex-column" data-bs-theme={themeMode} onKeyPress={handleKeyPress}>
            <Form.Group controlId="formEmail">
                <Form.Control
                    className="mt-3"
                    placeholder={t("Enter your email address...")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Control
                    className="mt-3"
                    placeholder={t("Enter your password...")}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                />
            </Form.Group>
            {!isLogin && (
                <Form.Group controlId="formName">
                    <Form.Control
                        className="mt-3"
                        placeholder={t("Enter your name...")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
            )}
            <Row className="d-flex justify-content-between mt-3" style={{width: "70%"}}>
                <div>
                    {isLogin ? (
                        <>
                            {t("No account?")}{" "}
                            <NavLink to={REGISTRATION_ROUTE} style={{color: themeColors.text}}>
                                {t('Sign up')}
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {t("Got an account?")}{" "}
                            <NavLink to={LOGIN_ROUTE} style={{color: themeColors.text}}>
                                {t('Log in')}
                            </NavLink>
                        </>
                    )}
                </div>
                <div>
                    <Button
                        className="mt-3"
                        onClick={handleSubmit}
                        variant={themeMode}
                    >
                        {isLogin ? t('Log in') : t('Sign up')}
                    </Button>
                </div>
            </Row>
        </Form>
    );
};

export default AuthForm;