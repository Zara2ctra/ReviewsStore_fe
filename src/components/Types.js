import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {TYPES_EN} from "../utils/consts";
import {Button, ListGroup} from "react-bootstrap";

const Types = observer(({themeMode}) => {
    const {review} = useContext(Context)
    function clickType(type) {
        review.setSelectedType(type)

    }

    return (
        <ListGroup
            style={{gap: "2em", flexDirection: "row", justifyContent: "space-between"}}
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
        </ListGroup>
    );
})

export default Types;