import React from 'react';
import {Button, Nav, NavDropdown} from "react-bootstrap";
import {BiMessageSquareAdd, BiUserCircle} from "react-icons/bi";
import {useTranslation} from "react-i18next";

const UserActions = ({themeMode, themeColors, handleCreateReview,
                      handleLogout, handleUserProfile, isAdmin,
                      handleAdminPanel}) => {
    const {t} = useTranslation();

    return (
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
                {isAdmin ?
                    <NavDropdown.Item onClick={handleAdminPanel}>{t('Admin Panel')}</NavDropdown.Item>
                    :
                    <></>
                }
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={handleLogout}>{t('Sign out')}</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}

export default UserActions;