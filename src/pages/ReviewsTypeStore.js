import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import ShowMoreButton from "../components/ShowMoreButton";
import {observer} from "mobx-react-lite";
import {fetchTypePopularReviews, fetchTypeRecentReviews} from "../http/reviewAPI";

const ReviewsTypeStore = observer(() => {
    const {user} = useContext(Context);
    let {type} = useParams();
    const [popularTypeReview, setPopularReview] = useState([]);
    const [recentTypeReview, setRecentReview] = useState([]);

    let themeColor = user.themeColors;
    let themeMode = user.themeMode;

    useEffect(() => {
        const fetchData = async () => {
            const recentReviews = await fetchTypeRecentReviews(type);
            setRecentReview(() => recentReviews.slice(0, 2));

            const popularReview = await fetchTypePopularReviews(type);
            setPopularReview(() => popularReview.slice(0, 2));
        }
        fetchData().then(r => r);
    }, [type]);


    const showMorePopularReviews = async () => {
        setPopularReview(await fetchTypePopularReviews())
    }

    const showMoreRecentReviews = async () => {
        setRecentReview(await fetchTypeRecentReviews())
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
                        <ReviewItem
                            key={review.id}
                            review={review}
                            themeMode={themeMode}
                        />
                    ))}
                </Row>
                <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentTypeReview}/>
            </Container>
        </Container>
    );
})

export default ReviewsTypeStore;