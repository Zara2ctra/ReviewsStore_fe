import React, {useEffect, useState} from 'react';
import {Card, Container, Image} from "react-bootstrap";
import Stars from "./Stars";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";
import MDEditor from "@uiw/react-md-editor";
import ReviewItemTitle from "./ReviewItemTitle";
import {fetchLikeStatus, fetchNumberLikes} from "../http/likeAPI";
import {getReviewRating} from "../http/ratingAPI";
import {CiImageOff} from "react-icons/ci";

const ReviewItem = ({review, t, user, themeMode, themeColors}) => {
    const navigate = useNavigate();
    const [reviewInfo, setReviewInfo] = useState({
        likeStatus: false,
        likesNumber: 0,
        rating: 0,
    });
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleClickAuthorization = (id) => {
        navigate(REVIEW_ROUTE + `/${id}`);
    };

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
    };

    useEffect(() => {
        const fetchLikesData = async () => {
            const likeStatus = await fetchLikeStatus(user.id, review.id);
            const likesNumber = await fetchNumberLikes(review.user.id);
            const rating = await getReviewRating(review.id);

            setReviewInfo({
                likeStatus,
                likesNumber,
                rating,
            });
        }

        fetchLikesData().then(r => r)

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const rootStyles = {
        cursor: "pointer",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        justifyContent: "space-between",
    };

    return (
        <div
            style={rootStyles}
            key={review.id}
            onClick={() => handleClickAuthorization(review.id)}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {review.imageUrl ? (
                    <Image
                        style={{maxWidth: "10rem", maxHeight: "15rem"}}
                        src={review.imageUrl}
                        alt="review image"
                        className={"m-1"}
                        border={themeMode}
                        rounded
                    />
                ) : (
                    <CiImageOff style={{fontSize: "5rem"}}/>
                )}
                <Stars
                    rate={reviewInfo.rating.calculatedRate}
                    isAuth={false}
                /> {t("average")} {reviewInfo.rating.calculatedRate} ({reviewInfo.rating.count} {t("times rated")})
            </div>
            <Container>
                <Card
                    border={themeMode}
                    data-bs-theme={themeMode}
                    data-color-mode={themeMode}
                >
                    <Card.Body style={{
                        maxHeight: "400px",
                        overflow: "hidden",
                    }}>
                        <ReviewItemTitle
                            t={t}
                            review={review}
                            likeStatus={reviewInfo.likeStatus}
                            likesNumber={reviewInfo.likesNumber}
                            themeColors={themeColors}
                            isSmallScreen={isSmallScreen}
                        />
                        <Card.Text>
                            <MDEditor.Markdown
                                source={review.content_text.slice(0, 100)}
                            />
                        </Card.Text>
                    </Card.Body>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-2px",
                            left: "-2px",
                            width: "100.5%",
                            height: "70px",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))`,
                                backdropFilter: "blur(10px)",
                                borderRadius: "0 0 5px 5px",
                                animation: "fade 1s ease-in-out infinite",
                            }}
                        ></div>
                    </div>
                </Card>
            </Container>
        </div>
    )
};

export default ReviewItem;