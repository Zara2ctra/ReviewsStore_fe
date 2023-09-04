import React, {useContext} from 'react';
import {Context} from "../index";
import Alert from 'react-bootstrap/Alert';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE} from "../utils/consts";
import {Container} from "react-bootstrap";

const Alert404 = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5"
        >
        <Alert
            variant={user.themeMode}
            onClose={() => navigate(MAIN_ROUTE)}
            dismissible>
            <Alert.Heading>Oops! That page doesn't exist!</Alert.Heading>
            <p>
                For some unbelievable reason this page is not on the site. Try visiting the others.
            </p>
        </Alert>
        </Container>
    );
})

export default Alert404;