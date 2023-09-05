import React from 'react';
import {Container} from "react-bootstrap";
import ReviewsList from "../components/ReviewsList";
import RecentReviews from "../components/RecentReviews";

const ReviewsStore = () => {

    return (
        <Container>
            <ReviewsList/>
        </Container>
    )
};

export default ReviewsStore;