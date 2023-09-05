import React from 'react';
import {Button} from "react-bootstrap";
import {MdExpandMore} from "react-icons/md";

const ShowMoreButton = ({actions, themeMode, reviews}) => {

    return (
        reviews.length < 4 ?
            <Button
                className="mx-auto d-block"
                style={{width: "30rem", marginTop: "1rem"}}
                variant={themeMode}
                onClick={() => actions()}
            >
                <MdExpandMore/>
            </Button>
         : <></>
    )
};

export default ShowMoreButton;