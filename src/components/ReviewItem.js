import React, {useContext, useEffect, useState} from 'react';
import {Card, Container, Image} from "react-bootstrap";
import Stars from "./Stars";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";
import MDEditor from "@uiw/react-md-editor";
import {Context} from "../index";
import {useTranslation} from "react-i18next";
import ReviewItemTitle from "./ReviewItemTitle";
import {fetchLikeStatus, fetchNumberLikes} from "../http/likeAPI";
import {fetchOneReview} from "../http/reviewAPI";
import {getReviewRating} from "../http/ratingAPI";

const footerBlur = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "70px",
    background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5))`,
    backdropFilter: "blur(10px)",
    borderRadius: "0 0 10px 10px",
}

const ReviewItem = (({review}) => {
    const {user} = useContext(Context);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likesNumber, setLikesNumber] = useState(0);
    const [rating, setRating] = useState(0)
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    function handleClickAuthorization(id) {
        navigate(REVIEW_ROUTE + `/${id}`);
    }

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
    };

    useEffect(() => {
        const fetchLikesData = async () => {

            const likeStatus = await fetchLikeStatus(user.id, review.id);
            const likesNumber = await fetchNumberLikes(review.user.id);
            const rating = await getReviewRating(review.id);
            setLikeStatus(likeStatus)
            setLikesNumber(likesNumber)
            setRating(rating)
        }

        fetchLikesData().then(r => r)

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const rootStyles = {
        cursor: "pointer",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
    };

    const imageContainerStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    return (
        <div
            style={rootStyles}
            key={review.id}
            onClick={() => handleClickAuthorization(review.id)}
        >
            <div style={imageContainerStyles}>
                <Image
                    style={{maxWidth: "10rem", maxHeight: "15rem"}}
                    src={review.imageUrl}
                    alt="review image"
                    className={"m-1"}
                    border={themeMode}
                    rounded
                />
                <Stars
                    rate={rating.calculatedRate}
                    isAuth={false}
                /> {t("average")} {rating.calculatedRate} ({rating.count} {t("times rated")})
            </div>
            <Container>
                <Card
                    border={themeMode}
                    data-bs-theme={themeMode}
                    data-color-mode={themeMode}
                >
                    <Card.Body>
                        <ReviewItemTitle
                            t={t}
                            review={review}
                            likeStatus={likeStatus}
                            likesNumber={likesNumber}
                            themeColors={themeColors}
                        />
                        <Card.Text>
                            <MDEditor.Markdown
                                source={review.content_text.slice(0, 100)}
                            />
                        </Card.Text>
                    </Card.Body>
                    <div style={footerBlur}></div>
                </Card>
            </Container>
        </div>
    )
});

export default ReviewItem;