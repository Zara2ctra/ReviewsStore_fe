import React from 'react';
import {Button, Nav} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const GuestActions = ({themeMode, handleAuthorization, handleRegistration, t}) => {
    const {t} = useTranslation();

    return (
        <Nav className="ml-auto" style={{color: 'white', margin: '15px', gap: '10px'}}>
            <Button variant={themeMode} className="m-lg-1" onClick={handleAuthorization}>
                {t('Authorization')}
            </Button>
            <Button variant={themeMode} className="m-lg-1" onClick={handleRegistration}>
                {t('Registration')}
            </Button>
        </Nav>
    )
}

export default GuestActions;