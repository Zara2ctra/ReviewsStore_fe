import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Form, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    REVIEW_CREATE_ROUTE,
    USER_PROFILE_ROUTE
} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Types from "./Types";
import LanguageSelect from "./LanguageSelect";
import ThemeToggle from "./ThemeToogle";
import UserActions from "./UserActions";
import GuestActions from "./GuestActions";
import ReviewStoreLogo from "./ReviewStoreLogo";
import GlobalSearch from "./GlobalSearch.js";

const NavBar = observer(() => {
    const {user} = useContext(Context);
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
        navigate(MAIN_ROUTE)
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
                    <GlobalSearch themeMode={themeMode} navigate={navigate}/>
                    {user.isAuth ? (
                        <UserActions
                            themeMode={themeMode}
                            themeColors={themeColors}
                            handleCreateReview={() => handleNavigation(REVIEW_CREATE_ROUTE)}
                            handleLogout={handleLogout}
                            handleAdminPanel={() => handleNavigation(ADMIN_ROUTE)}
                            isAdmin={user.isAdmin}
                            handleUserProfile={() => handleNavigation(USER_PROFILE_ROUTE + `/${user.id}`)}
                        />
                    ) : (
                        <GuestActions
                            themeMode={themeMode}
                            handleAuthorization={() => handleNavigation(LOGIN_ROUTE)}
                            handleRegistration={() => handleNavigation(REGISTRATION_ROUTE)}
                        />
                    )}
                    <ThemeToggle isDarkMode={isDarkMode} themeColors={themeColors} handleThemeToggle={handleThemeToggle}/>
                    <Form>
                        <LanguageSelect themeMode={themeMode}/>
                    </Form>
                </Container>
            </Navbar>
            <Container>
                <Types themeMode={themeMode} user={user} handleNavigation={handleNavigation}/>
            </Container>
        </Container>
    )
});

export default NavBar;