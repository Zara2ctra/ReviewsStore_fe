import React from 'react';
import {Button} from "react-bootstrap";
import {MdExpandMore} from "react-icons/md";

const ShowMoreButton = ({actions, themeMode, reviews}) => {

    if (reviews.length < 2) {
        return (
            <></>
        )
    }

    return (
        reviews.length <= 2 ?
            <Button
                className="mx-auto d-block"
                style={{width: "15rem", marginTop: "1rem"}}
                variant={themeMode}
                onClick={() => actions()}
            >
                <MdExpandMore/>
            </Button>
         : <></>
    )
};

export default ShowMoreButton;