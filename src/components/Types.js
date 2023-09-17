import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {REVIEWS_STORE_ROUTE, TYPES_EN} from "../utils/consts";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Types = observer(({themeMode}) => {
    const { t, i18n } = useTranslation();
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const clickType = (type) => {
        user.setSelectedType(type);
        navigate(`${REVIEWS_STORE_ROUTE}/${type}`);
    }

    return (
        <Container
            style={{display: "flex",flexWrap: "wrap", gap: "2em", flexDirection: "row", justifyContent: "space-between"}}
        >
            {TYPES_EN.map((type) => {
                return (
                    <Button
                        key={type}
                        variant={themeMode}
                        active={type === user.selectedType}
                        onClick={() => clickType(type)}
                    >
                        {t(`${type}`)}
                    </Button>
                )
            })}
        </Container>
    );
})

export default Types;