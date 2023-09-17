import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import ReviewList from '../components/ReviewList';
import {
    fetchPopularReviews,
    fetchRecentReviews,
    fetchTypePopularReviews,
    fetchTypeRecentReviews
} from '../http/reviewAPI';
import {Context} from '../index';

const ReviewsStore = observer(() => {
    const {t} = useTranslation();
    const {user} = useContext(Context);
    const {type} = useParams();
    const [reviews, setReviews] = useState({
        popularReviews: [],
        recentReviews: [],
    });
    const [showAllRecentReviews, setShowAllRecentReviews] = useState(false);
    const [showAllPopularReviews, setShowAllPopularReviews] = useState(false);

    const isTypePage = !!type;

    const fetchData = async (type) => {
        const recentReviews = isTypePage ? await fetchTypeRecentReviews(type) : await fetchRecentReviews();
        const popularReviews = isTypePage ? await fetchTypePopularReviews(type) : await fetchPopularReviews();

        setReviews((prevReviews) => ({
            ...prevReviews,
            recentReviews: recentReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            popularReviews: popularReviews.sort((a, b) => b.rating - a.rating),
        }));
        setShowAllRecentReviews(false);
        setShowAllPopularReviews(false);
    };

    useEffect(() => {
        fetchData(type);
    }, [type]);

    const showMoreReviews = (name) => {
        if (name === 'showAllRecentReviews') {
            setShowAllRecentReviews(true);
        } else if (name === 'showAllPopularReviews') {
            setShowAllPopularReviews(true);
        }
    };

    return (
        <Container className={'mt-5'} style={{color: user.themeColors.text}}>
            <h2 style={{margin: '40px'}}>{t('Popular reviews')}</h2>
            <ReviewList
                reviews={reviews.popularReviews}
                showAll={showAllPopularReviews}
                showMore={() => showMoreReviews('showAllPopularReviews')}
                themeMode={user.themeMode}
            />
            <h2 style={{margin: '40px'}}>{t('Recent reviews')}</h2>
            <ReviewList
                reviews={reviews.recentReviews}
                showAll={showAllRecentReviews}
                showMore={() => showMoreReviews('showAllRecentReviews')}
                themeMode={user.themeMode}
            />
        </Container>
    );
});

export default ReviewsStore;