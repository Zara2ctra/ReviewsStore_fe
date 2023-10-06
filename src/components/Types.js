import React from 'react';
import {observer} from "mobx-react-lite";
import {REVIEWS_STORE_ROUTE, TYPES_EN} from "../utils/consts";
import {Button, Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const Types = observer(({themeMode, user, handleNavigation}) => {
    const {t} = useTranslation();

    const clickType = (type) => {
        user.setSelectedType(type);
        handleNavigation(`${REVIEWS_STORE_ROUTE}/${type}`);
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