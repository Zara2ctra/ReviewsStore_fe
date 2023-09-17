import React from 'react';
import {Nav, Button} from "react-bootstrap";

const GuestActions = ({ themeMode, handleAuthorization, handleRegistration, t }) => (
    <Nav className="ml-auto" style={{ color: 'white', margin: '15px', gap: '10px' }}>
        <Button variant={themeMode} className="m-lg-1" onClick={handleAuthorization}>
            {t('Authorization')}
        </Button>
        <Button variant={themeMode} className="m-lg-1" onClick={handleRegistration}>
            {t('Registration')}
        </Button>
    </Nav>
);

export default GuestActions;