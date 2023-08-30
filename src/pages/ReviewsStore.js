import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context);
    const themeColors = user.themeColors;


    return (
        <Container>

        </Container>
    )
};

export default Auth;