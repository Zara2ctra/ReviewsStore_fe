import React, {useContext, useEffect, useState} from 'react';
import socketIO from 'socket.io-client';
import useChat from "../hooks/useChat";
import MDEditor from '@uiw/react-md-editor';
import {useParams} from "react-router-dom";
import {Container, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CommentListItem from "../components/CommentListItem";
import {fetchOneReview} from "../http/reviewAPI";
import {useTranslation} from "react-i18next";
import CommentFooter from "../components/CommentFooter";
import {fetchLikeStatus, fetchNumberLikes, toggleLike} from "../http/likeAPI";
import Stars from "../components/Stars";
import {changeRating, getReviewRating,} from "../http/ratingAPI";
import ReviewInfo from "../components/ReviewInfo";

const socket = socketIO.connect('https://reviews-storebe.onrender.com:10000');

const ReviewPage = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context);
    const [reviewData, setReviewData] = useState({
        reviewInfo: "",
        artwork: "",
        userInfo: "",
        likeStatus: false,
        likesNumber: 0,
        rating: 2.5,
    });
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const {id} = useParams();
    const startChat = useChat(id);
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const fetchData = async () => {
        const reviewData = await fetchOneReview(id);
        const likeStatus = await fetchLikeStatus(user.id, id);
        const likesNumber = await fetchNumberLikes(reviewData.user.id);
        const rating = await getReviewRating(id);

        setReviewData({
            reviewInfo: reviewData,
            artwork: reviewData.art_work,
            userInfo: reviewData.user,
            likeStatus: likeStatus,
            likesNumber: likesNumber,
            rating: rating.calculatedRate,
            ratingCount: rating.count,
        });
    }

    useEffect(() => {
        fetchData().then(r => r);

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const toggleLikeHandler = async () => {
        await toggleLike(user.id, id);
        const updatedLikeStatus = !reviewData.likeStatus;
        const likesNumber = await fetchNumberLikes(reviewData.userInfo.id);

        setReviewData({
            ...reviewData,
            likesNumber: likesNumber,
            likeStatus: updatedLikeStatus
        });
    }

    const handleRating = async (rate) => {
        await changeRating(rate, user.id, id);
        const rating = await getReviewRating(id);

        setReviewData({
            ...reviewData,
            rating: rating.calculatedRate,
            ratingCount: rating.count,
        })
    }


    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
    };

    return (
        <Container
            className="mt-3"
            data-bs-theme={themeMode}
            style={{
                color: themeColors.text,
                backgroundColor: themeColors.background
            }}
        >
            <ReviewInfo
                reviewData={reviewData}
                isSmallScreen={isSmallScreen}
                handleRating={handleRating}
                toggleLikeHandler={toggleLikeHandler}
                themeMode={themeMode}
                themeColors={themeColors}
            />
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0 0 20px 0"}}>
                    {reviewData.reviewInfo.name} {reviewData.reviewInfo.score}/10
                </h1>
                <MDEditor.Markdown
                    source={reviewData.reviewInfo.content_text}
                />
                {user.isAuth ? (
                    <Stars handler={handleRating} isAuth={user.isAuth}/>
                ) : (
                    <>
                    </>
                )
                }
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 style={{padding: "0 0 10px 0"}}>
                    {t('Comments:')}
                </h1>
                <ListGroup style={{background: themeColors.background, gap: "1rem"}}>
                    {startChat.comments.map((comment) => (
                        <CommentListItem
                            key={comment.id}
                            comment={comment}
                            handler={startChat.removeComment}
                        />
                    ))}
                </ListGroup>
                <CommentFooter sendComment={startChat.sendComment} reviewId={id}/>
            </Row>
        </Container>
    );
});

export default ReviewPage;