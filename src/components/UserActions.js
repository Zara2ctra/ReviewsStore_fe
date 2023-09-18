import React from 'react';
import {Button, Nav, NavDropdown} from "react-bootstrap";
import {BiMessageSquareAdd, BiUserCircle} from "react-icons/bi";

const UserActions = ({themeMode, themeColors, handleCreateReview, handleLogout, t, handleUserProfile}) => (
    <Nav className="ml-auto p-2">
        <Button variant={themeMode} className="m-lg-1" onClick={handleCreateReview}>
            <BiMessageSquareAdd/>
        </Button>
        <NavDropdown
            data-bs-theme={themeMode}
            style={{color: themeColors.text}}
            title={<BiUserCircle style={{color: themeColors.text, fontSize: '2rem'}}/>}
        >
            <NavDropdown.Item onClick={handleUserProfile}>{t('Profile')}</NavDropdown.Item>
            <NavDropdown.Item onClick={handleCreateReview}>{t('Add new review')}</NavDropdown.Item>
            <NavDropdown.Item>{t('Some text')}</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={handleLogout}>{t('Sign out')}</NavDropdown.Item>
        </NavDropdown>
    </Nav>
);

export default UserActions;