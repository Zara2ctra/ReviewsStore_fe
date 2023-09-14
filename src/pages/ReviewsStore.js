import React, {useContext, useState, useEffect} from 'react';
import {Container, Row} from "react-bootstrap";
import {Context} from "../index";
import ReviewItem from "../components/ReviewItem";
import ShowMoreButton from "../components/ShowMoreButton";
import {observer} from "mobx-react-lite";
import {fetchPopularReviews, fetchRecentReviews} from "../http/reviewAPI";
import {useTranslation} from "react-i18next";

const ReviewsStore = observer(() => {
    const {user} = useContext(Context);
    const {t, i18n} = useTranslation();
    let themeColor = user.themeColors;
    let themeMode = user.themeMode;
    const [popularReview, setPopularReview] = useState([]);
    const [recentReview, setRecentReview] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const recentReviews = await fetchRecentReviews();
            setRecentReview(()=> recentReviews.slice(0, 2));

            const popularReview = await fetchPopularReviews();
            setPopularReview(()=> popularReview.slice(0, 2));
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
        <Container>
            <Container
                className={"mt-5"}
                style={{color: themeColor.text}}
            >
                <h2>
                    {t('Popular reviews')}
                </h2>
                <Row
                    xs={1} md={1} className="g-4"
                >
                    {popularReview.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review}
                        />
                    ))}
                </Row>
            </Container>
            <ShowMoreButton actions={showMorePopularReviews} themeMode={themeMode} reviews={popularReview}/>
            <Container
                className={"mt-5"}
                style={{color: themeColor.text}}
            >
                <h2>
                    {t('Recent reviews')}
                </h2>
                <Row
                    xs={1} md={1} className="g-4"
                >
                    {recentReview.map((review) => (
                        <ReviewItem key={review.id} review={review} themeMode={themeMode}/>
                    ))}
                </Row>
                <ShowMoreButton actions={showMoreRecentReviews} themeMode={themeMode} reviews={recentReview}/>
            </Container>
        </Container>
    );
});

export default ReviewsStore;