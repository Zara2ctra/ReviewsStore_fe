import React, {useContext, useEffect, useState} from 'react';
import useChat from "../hooks/useChat";
import MDEditor from '@uiw/react-md-editor';
import {useNavigate, useParams} from "react-router-dom";
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
import ReviewPageInfo from "../components/ReviewPageInfo";
import {USER_PROFILE_ROUTE} from "../utils/consts";

const ReviewPage = observer(() => {
    const {t} = useTranslation();
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
    const navigate = useNavigate()
    const startChat = useChat(id);

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const isAuth = user.isAuth;
    const isAdmin = user.isAdmin;

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
    }, [id])

    const navigateUserPage = (id) => {
        navigate(USER_PROFILE_ROUTE + `/${id}`)
    }

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
            <ReviewPageInfo
                reviewData={reviewData}
                isSmallScreen={isSmallScreen}
                handleRating={handleRating}
                toggleLikeHandler={toggleLikeHandler}
                navigateUserPage={navigateUserPage}
                themeMode={themeMode}
                themeColors={themeColors}
            />
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0 0 20px 0", display: "flex", justifyContent: "space-between"}}>
                    <span>
                        {reviewData.reviewInfo.name}
                    </span>
                    <span>
                        {t("Score")}:{reviewData.reviewInfo.score}/10
                    </span>
                </h1>
                <MDEditor.Markdown
                    style={{padding: "20px"}}
                    source={reviewData.reviewInfo?.content_text}
                />
                {isAuth ? (
                    <Stars handler={handleRating} isAuth={isAuth}/>
                ) : (<></>)}
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 style={{padding: "0 0 10px 0"}}>
                    {t('Comments:')}
                </h1>
                <ListGroup style={{background: themeColors.background, gap: "1rem"}}>
                    {startChat.comments.map((comment) => (
                        <CommentListItem
                            themeColors={themeColors}
                            navigateUserPage={navigateUserPage}
                            key={comment.id}
                            user={user}
                            comment={comment}
                            isAuth={isAuth}
                            isAdmin={isAdmin}
                            handler={startChat.removeComment}
                            t={t}
                        />
                    ))}
                </ListGroup>
                <CommentFooter
                    sendComment={startChat.sendComment}
                    reviewId={id}
                    t={t}
                    user={user}
                />
            </Row>
        </Container>
    );
});

export default ReviewPage;