import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import ShowMoreButton from "../components/ShowMoreButton";
import {observer} from "mobx-react-lite";

const ReviewsTypeStore = observer(() => {
    const {user} = useContext(Context);
    const {type} = useParams();
    const {review} = useContext(Context);
    const typeReviews = getTypeReviews(review.reviews, type);

    let themeColor = user.themeColors;
    let themeMode = user.themeMode;

    const [popularTypeReview, setPopularReview] = useState(() => getPopularReviews(typeReviews, 2));
    const [recentTypeReview, setRecentReview] = useState(() => getRecentReviews(typeReviews, 2));

    useEffect(() => {
        const typeReviews = getTypeReviews(review.reviews, type);
        setPopularReview(() => getPopularReviews(typeReviews, 2));
        setRecentReview(() => getRecentReviews(typeReviews, 2));
    }, [type]);

    function getTypeReviews(reviews, type) {
        return reviews.filter((review) => review.artWorkType === type)
    }

    function getPopularReviews(review, n) {
        return review.slice().sort((a, b) => {
            return b.rating - a.rating;
        }).slice(0, n)
    }

    const showMorePopularReviews = () => {
        setPopularReview(() => getPopularReviews(typeReviews, 6))
    }

    function getRecentReviews(review, n) {
        return review.slice().sort((a, b) => {
            return b.id - a.id;
        }).slice(0, n)
    }

    const showMoreRecentReviews = () => {
        setRecentReview(() => getRecentReviews(typeReviews, 6))
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
                    {popularTypeReview.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                            themeMode={themeMode}
                        />
                    ))}
                </Row>
                <ShowMoreButton actions={showMorePopularReviews} themeMode={themeMode} reviews={popularTypeReview}/>
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
                    {recentTypeReview.map((review) => (
                        <ReviewItem key={review.id} review={review} themeMode={themeMode}/>
                    ))}
                </Row>
                <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentTypeReview}/>
            </Container>
        </Container>
    );
})

export default ReviewsTypeStore;