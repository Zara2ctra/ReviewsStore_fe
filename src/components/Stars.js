import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {Rating} from 'react-simple-star-rating'

const Stars = ({rate, handler, isAuth}) => {
    return (
        <Container style={{textAlign: "end"}}>
            {isAuth ? (
                <Rating
                    initialValue={rate}
                    onClick={handler}
                />
            ) : (
                <Rating
                    initialValue={rate}
                    readonly={true}
                />
            )}
        </Container>)
};

export default Stars;