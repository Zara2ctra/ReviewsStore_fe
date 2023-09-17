import React from 'react';
import {Button} from "react-bootstrap";
import {MdExpandMore} from "react-icons/md";

const ShowMoreButton = ({actions, themeMode, showAll, isShow}) => {
    return (
        isShow ? (
            <Button
                className="mx-auto d-block"
                style={{width: "15rem", marginTop: "1rem"}}
                variant={themeMode}
                onClick={() => actions(showAll)}
            >
                <MdExpandMore/>
            </Button>
        ) : (
            <></>
        )
    );
};

export default ShowMoreButton;