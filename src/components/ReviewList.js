import React from 'react';
import { Container } from 'react-bootstrap';
import ReviewItem from '../components/ReviewItem';
import ShowMoreButton from '../components/ShowMoreButton';

const ReviewList = ({ reviews, showAll, showMore, themeMode, t, user, themeColors}) => {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {showAll ? (
                reviews.map((review) => (
                    <ReviewItem
                        key={review.createdAt}
                        review={review}
                        t={t}
                        themeColors={themeColors}
                        themeMode={themeMode}
                        user={user}
                    />
                ))
            ) : (
                reviews.slice(0, 2).map((review) => (
                    <ReviewItem
                        key={review.createdAt}
                        review={review}
                        t={t}
                        themeColors={themeColors}
                        themeMode={themeMode}
                        user={user}
                    />
                ))
            )}
            <ShowMoreButton
                actions={showMore}
                showAll={showAll}
                themeMode={themeMode}
                isShow={!showAll}
            />
        </Container>
    );
};

export default ReviewList;