import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ReviewItem from "./ReviewItem";

const ReviewList = () => {
    const {review} = useContext(Context)


    return (
        <Row className="d-flex">
            {review.reviews.map((review) =>
                <ReviewItem key={review.id} review={review}/>
            )}
        </Row>
    );
};

export default ReviewList;