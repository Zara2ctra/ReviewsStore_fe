import React, {useContext, useEffect, useState} from 'react';
import socketIO from 'socket.io-client';
import useChat from "../hooks/useChat";
import MDEditor from '@uiw/react-md-editor';
import {useParams} from "react-router-dom";
import {Container, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CommentListItem from "../components/CommentListItem";
import {fetchOneReview} from "../http/reviewAPI";
import {myURL} from "../utils/consts";
import {BiLike, BiUserCircle} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import CommentFooter from "../components/CommentFooter";
import {fetchLikeStatus, fetchNumberLikes, toggleLike} from "../http/likeAPI";
import Stars from "../components/Stars";
import {changeRating, getReviewRating,} from "../http/ratingAPI";

const socket = socketIO.connect('reviews-storebe.onrender.com:10000');

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

    const {id} = useParams();
    const startChat = useChat(id);
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    useEffect(() => {
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

        fetchData().then(r => r);
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

    return (
        <Container
            className="mt-3"
            data-bs-theme={themeMode}
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <div style={{display: "inline-flex", alignItems: "flex-start"}}>
                <Container>
                    <Image
                        border={themeMode}
                        width={300}
                        height={300}
                        src={reviewData.reviewInfo.imageUrl}
                        thumbnail
                    />
                    <Stars
                        rate={reviewData.rating}
                        handler={handleRating}
                        isAuth={false}
                    /> {t("average")} {reviewData.rating} ({reviewData.ratingCount} {t("times rated")})
                </Container>
                <Container className="d-flex flex-column align-items-center justify-content-center">
                    <h2>
                        {t(`${reviewData.artwork.type}`)}: <br/>
                        {reviewData.artwork.name}
                    </h2>
                    <div
                        style={{
                            display: "inline-flex",
                            cursor: user.isAuth ? "pointer" : ""
                        }}
                        onClick={user.isAuth ?
                            toggleLikeHandler
                            :
                            () => user.isAuth
                        }
                    >
                        <BiUserCircle style={{color: themeColors.text, fontSize: '3rem'}}/>
                        <span style={{fontSize: "1.5rem"}}>
                            {reviewData.userInfo.name}
                        </span>
                        {reviewData.likeStatus ? (
                            <BiLike
                                style={{
                                    color: "green",
                                }}
                            />
                        ) : (
                            <BiLike
                                style={{
                                    color: themeColors.text,
                                }}
                            />
                        )
                        }
                        <span>
                            {reviewData.likesNumber}
                        </span>
                    </div>
                </Container>
            </div>
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0 0 20px 0"}}>
                    {reviewData.reviewInfo.name} {reviewData.reviewInfo.score}/10
                </h1>
                <MDEditor.Markdown
                    source={reviewData.reviewInfo.content_text}
                />
                <Stars handler={handleRating} isAuth={user.isAuth}/>
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