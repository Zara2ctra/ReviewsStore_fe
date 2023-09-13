import React, {useContext} from 'react';
import {Context} from "../index";
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE} from "../utils/consts";
import {Button, Container} from "react-bootstrap";

const Alert404 = observer(() => {
    const {user} = useContext(Context);
    const themeMode = user.themeMode
    const themeColors = user.themeColors;
    const navigate = useNavigate();

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5"
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <Alert
                variant={themeMode}
                onClose={() => navigate(MAIN_ROUTE)}
                dismissible
            >
                <Alert.Heading>Oops! That page doesn't exist!</Alert.Heading>
                <p>
                    For some unbelievable reason this page is not on the site. Try visiting the others.
                </p>
                <Button
                    className={"d-flex"}
                    style={{margin: "auto"}}
                    variant={themeMode}
                    onClick={() => navigate(MAIN_ROUTE)}
                >
                    Return to main page
                </Button>
            </Alert>
        </Container>
    );
})

export default Alert404;