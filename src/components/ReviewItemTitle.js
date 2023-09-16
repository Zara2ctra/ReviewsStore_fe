import React from 'react';
import {Card, Container} from "react-bootstrap";
import {BiLike, BiUserCircle} from "react-icons/bi";

const ReviewItemTitle = ({themeColors, likesNumber, likeStatus, review, t}) => {

    return (
        <Card.Title
            className={"d-flex justify-content-between"}
            style={{flexWrap: "wrap"}}
        >
            <Container style={{display: "flex", gap: "0.5rem"}}>
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