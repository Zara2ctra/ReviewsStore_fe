import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import ShowMoreButton from "../components/ShowMoreButton";
import {observer} from "mobx-react-lite";
import {fetchTypePopularReviews, fetchTypeRecentReviews} from "../http/reviewAPI";
import {useTranslation} from "react-i18next";

const ReviewsTypeStore = observer(() => {
    const {t, i18n} = useTranslation();
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
        const popularReview = await fetchTypePopularReviews()
        setPopularReview(popularReview)
    }

    const showMoreRecentReviews = async () => {
        const popularReview = await fetchTypeRecentReviews()
        setRecentReview(popularReview)
    }

    return (
        <Container
            className={"mt-5"}
            style={{color: themeColor.text}}
        >
            <h2>
                {t('Popular reviews')}
            </h2>
            <Container style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                {popularTypeReview.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                    />
                ))}
            </Container>
            <ShowMoreButton actions={showMorePopularReviews} themeMode={themeMode} reviews={popularTypeReview}/>
            <h2>
                {t('Recent reviews')}
            </h2>
            <Container style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                {recentTypeReview.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        themeMode={themeMode}
                    />
                ))}
            </Container>
            <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentTypeReview}/>
        </Container>
    );
});

export default ReviewsTypeStore;