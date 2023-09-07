import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {REVIEWS_STORE_ROUTE, TYPES_EN} from "../utils/consts";
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Types = observer(({themeMode}) => {
    const {review} = useContext(Context);
    const navigate = useNavigate();

    const clickType = (type) => {
        review.setSelectedType(type);
        navigate(`${REVIEWS_STORE_ROUTE}/${type}`);
    }

    return (
        <Container
            style={{display: "flex",flexWrap: "wrap", gap: "2em", flexDirection: "row", justifyContent: "space-between"}}
        >
            {TYPES_EN.map((type) => {
                return (
                    <Button
                        variant={themeMode}
                        active={type === review.selectedType}
                        onClick={() => clickType(type)}
                    >
                        {type}
                    </Button>
                )
            })}
        </Container>
    );
})

export default Types;