import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Form, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, REVIEW_CREATE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Types from "./Types";
import {useTranslation} from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import ThemeToggle from "./ThemeToogle";
import UserActions from "./UserActions";
import GuestActions from "./GuestActions";
import ReviewStoreLogo from "./ReviewStoreLogo";
import GlobalSearch from "./GlobalSearch";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const {t, i18n} = useTranslation();
    const isDarkMode = user.themeMode === "dark";
    const themeMode = user.themeMode
    const themeColors = user.themeColors;
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleThemeToggle = () => {
        user.setThemeMode();
        localStorage.setItem('themeMode', user.themeMode);
    };

    const handleLogout = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    const navbarStyles = {
        color: themeColors.text,
        backgroundColor: themeColors.background,
        display: "flex",
        flexWrap: "wrap",
        padding: "10px"
    }

    return (
        <Container>
            <Navbar style={navbarStyles}>
                <Container>
                    <ReviewStoreLogo themeColors={themeColors} handleMain={() => handleNavigation(MAIN_ROUTE)}/>
                    <GlobalSearch themeMode={themeMode} t={t}/>
                    {user.isAuth ? (
                        <UserActions
                            themeMode={themeMode}
                            themeColors={themeColors}
                            handleCreateReview={() => handleNavigation(REVIEW_CREATE_ROUTE)}
                            handleLogout={handleLogout}
                            t={t}
                        />
                    ) : (
                        <GuestActions
                            themeMode={themeMode}
                            handleAuthorization={() => handleNavigation(LOGIN_ROUTE)}
                            handleRegistration={() => handleNavigation(REGISTRATION_ROUTE)}
                            t={t}
                        />
                    )}
                    <ThemeToggle isDarkMode={isDarkMode} handleThemeToggle={handleThemeToggle}/>
                    <Form>
                        <LanguageSelect/>
                    </Form>
                </Container>
            </Navbar>
            <Container>
                <Types themeMode={themeMode}/>
            </Container>
        </Container>
    )
});

export default NavBar;