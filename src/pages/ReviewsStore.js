import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Container} from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import ShowMoreButton from "../components/ShowMoreButton";
import {observer} from "mobx-react-lite";
import {fetchPopularReviews, fetchRecentReviews} from "../http/reviewAPI";
import {useTranslation} from "react-i18next";

const ReviewsStore = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context);
    const [popularReview, setPopularReview] = useState([]);
    const [recentReview, setRecentReview] = useState([]);

    let themeColor = user.themeColors;
    let themeMode = user.themeMode;

    useEffect(() => {
        const fetchData = async () => {
            const recentReviews = await fetchRecentReviews();
            const popularReview = await fetchPopularReviews();

            setRecentReview(() => recentReviews.slice(0, 2));
            setPopularReview(() => popularReview.slice(0, 2));
        }
        fetchData().then(r => r);
    }, [])


    const showMorePopularReviews = async () => {
        setPopularReview(await fetchPopularReviews())
    }

    const showMoreRecentReviews = async () => {
        setRecentReview(await fetchPopularReviews())
    }

    return (
        <Container
            className={"mt-5"}
            style={{color: themeColor.text}}
        >
            <h2 style={{margin: "40px"}}>
                {t('Popular reviews')}
            </h2>
            <Container style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                {popularReview.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                    />
                ))}
            </Container>
            <ShowMoreButton actions={showMorePopularReviews} themeMode={themeMode} reviews={popularReview}/>
            <h2 style={{margin: "40px"}}>
                {t('Recent reviews')}
            </h2>
            <Container style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                {recentReview.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        themeMode={themeMode}
                    />
                ))}
            </Container>
            <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentReview}/>
        </Container>
    );
});

export default ReviewsStore;