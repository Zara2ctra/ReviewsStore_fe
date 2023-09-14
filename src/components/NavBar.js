import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, REVIEW_CREATE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {FiMoon, FiSun} from "react-icons/fi";
import {BiMessageSquareAdd, BiSearchAlt, BiUserCircle} from "react-icons/bi";
import LogoSVG from "../utils/logo.svg";
import Types from "./Types";
import {useTranslation} from "react-i18next";
import LanguageSelect from "./LanguageSelect";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const { t, i18n } = useTranslation();
    const isDarkMode = user.themeMode === "dark";
    const themeMode = user.themeMode
    const themeColors = user.themeColors;
    const navigate = useNavigate();

    function handleClickAuthorization() {
        navigate(LOGIN_ROUTE);
    }

    function handleClickRegistration() {
        navigate(REGISTRATION_ROUTE);
    }

    function handleClickCreateReview() {
        navigate(REVIEW_CREATE_ROUTE)
    }

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Container>
            <Navbar
                style={{
                    color: themeColors.text,
                    backgroundColor: themeColors.background,
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "10px"
            }}
            >
                <Container>
                    <NavLink
                        style={{color: themeColors.text,}}
                        to={MAIN_ROUTE}
                    >
                        <Image
                            style={{
                                color: themeColors.text,
                                backgroundColor: themeColors.background,
                                width: "15em",
                                height: "5em"
                            }}
                            alt="logo"
                            src={LogoSVG}
                        />
                    </NavLink>
                    <Form className="d-flex">
                        <Form.Control
                            data-bs-theme={themeMode}
                            type="search"
                            placeholder={t("Search")}
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button
                            variant={themeMode}
                        >
                            <BiSearchAlt/>
                        </Button>
                    </Form>
                    {user.isAuth ?
                        <Nav className="ml-auto p-2">
                            <Button
                                variant={themeMode}
                                className={"m-lg-1"}
                                onClick={handleClickCreateReview}
                            >
                                <BiMessageSquareAdd/>
                            </Button>
                            <NavDropdown
                                data-bs-theme={themeMode}
                                style={{color: themeColors.text}}
                                title={
                                    <BiUserCircle
                                        style={{color: themeColors.text, fontSize: '2rem'}}
                                    />
                                }
                            >
                                <NavDropdown.Item>
                                    {t('Profile')}
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={handleClickCreateReview}
                                >
                                    {t('Add new review')}
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    {t('Some text')}
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item
                                    onClick={() => logOut()}
                                >
                                    {t('Sign out')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button
                                variant={themeMode}
                                className={"m-lg-1"}
                                onClick={handleClickAuthorization}
                            >
                                {t('Authorization')}
                            </Button>
                            <Button
                                variant={themeMode}
                                className={"m-lg-1"}
                                onClick={handleClickRegistration}
                            >
                                {t('Registration')}
                            </Button>
                        </Nav>
                    }
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={isDarkMode ?
                            <FiMoon
                                style={{color: themeColors.text}}
                            />
                            :
                            <FiSun
                                style={{color: themeColors.text}}
                            />
                        }
                        onClick={() => {
                            user.setThemeMode()
                            localStorage.setItem('themeMode', user.themeMode);
                        }}
                    />
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