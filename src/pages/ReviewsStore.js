import React from 'react';
import {Container} from "react-bootstrap";
import PopularReviews from "../components/PopularReviews";
import RecentReviews from "../components/RecentReviews";

const ReviewsStore = () => {

    return (
        <Container>
            <PopularReviews/>
            <RecentReviews/>
        </Container>
    )
};

export default ReviewsStore;