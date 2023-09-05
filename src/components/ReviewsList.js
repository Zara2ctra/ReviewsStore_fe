import React, {useContext, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../index";
import ReviewItem from "./ReviewItem";
import ShowMoreButton from "./ShowMoreButton";

const ReviewsList = () => {
    const {user} = useContext(Context);
    const {review} = useContext(Context)
    let themeColor = user.themeColors;
    let themeMode = user.themeMode;
    const [popularReview, setPopularReview] = useState(() => getPopularReviews(review.reviews, 2));
    const [recentReview, setRecentReview] = useState(() => getRecentReviews(review.reviews, 2));

    function getPopularReviews(review, n) {
        return review.sort((a, b) => {
            return b.rating - a.rating;
        }).slice(0, n)
    }

    const showMorePopularReviews = () => {
        setPopularReview(() => getPopularReviews(review.reviews).slice(0, 6))
    }

    function getRecentReviews(review, n) {
        return review.sort((a, b) => {
            return b.id - a.id;
        }).slice(0, n)
    }

    const showMoreRecentReviews = () => {
        setRecentReview(() => getRecentReviews(review.reviews).slice(0, 6))
    }


    return (
        <Container>
            <Container
                className={"mt-5"}
                style={{color: themeColor.text}}
            >
                <h2>
                    Popular reviews
                </h2>
                <Row
                    xs={1} md={1} className="g-4"
                >
                    {popularReview.map((review) => (
                        <ReviewItem review={review} themeMode={themeMode}/>
                    ))}
                </Row>
                <ShowMoreButton actions={showMorePopularReviews} themeMode={themeMode} reviews={popularReview}/>
            </Container>
            <Container
                className={"mt-5"}
                style={{color: themeColor.text}}
            >
                <h2>
                    Recent reviews
                </h2>
                <Row
                    xs={1} md={1} className="g-4"
                >
                    {recentReview.map((review) => (
                        <ReviewItem review={review} themeMode={themeMode}/>
                    ))}
                </Row>
                <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentReview}/>
            </Container>
        </Container>
    );
};

export default ReviewsList;