import React from 'react';
import {Card, Container} from "react-bootstrap";
import {BiLike, BiUserCircle} from "react-icons/bi";
import {format} from "date-fns";

const ReviewItemTitle = ({themeColors, likesNumber, likeStatus, review, t, isSmallScreen}) => {
    const reviewCreatedDate = new Date(review.createdAt);

    return (
        <Card.Title
            className={"d-flex justify-content-between"}
            style={{flexWrap: "wrap", padding: "0px"}}
        >
            <Container style={{display: "flex", flexWrap: isSmallScreen ? "wrap" : "nowrap"}}>
                <Container style={{display: "flex", gap: "0.5rem", padding: "0px"}}>
                    <BiUserCircle
                        style={{color: themeColors.text, fontSize: '3rem'}}
                    />
                    <span
                        style={{fontSize: "2rem"}}
                    >
                    {review.user.name}
                </span>
                    {likeStatus ? (
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
                    {likesNumber}
                </span>
                </Container>
                <span style={{textAlign: "end"}}>
                    {format(reviewCreatedDate, 'dd.MM.yyyy HH:mm')}
                </span>
            </Container>
            <Container style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "2.5rem",
                flexWrap: "wrap"
            }}>
                <div>
                    {t(`${review?.art_work?.type}`)} : {review?.art_work?.name}
                </div>
                <div>
                    {t("Score") + ": " + review.score + "/10"}
                </div>
            </Container>
        </Card.Title>
    );
};

export default ReviewItemTitle;