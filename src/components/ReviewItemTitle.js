import React from 'react';
import {Card, Container} from "react-bootstrap";
import {BiLike, BiUserCircle} from "react-icons/bi";

const ReviewItemTitle = ({themeColor, userReview, artworkReview, reviewScore, t}) => {

    return (
        <Card.Title
            className={"d-flex justify-content-between"}
            style={{flexWrap: "wrap"}}
        >
            <Container style={{display: "flex", gap: "0.5rem"}}>
                <BiUserCircle
                    style={{color: themeColor.text, fontSize: '3rem'}}
                />
                <span
                    style={{fontSize: "2rem"}}
                >
                    {userReview.name}
                </span>
                <BiLike/><span>10</span>
            </Container>
            <Container style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "2.5rem",
                flexWrap: "wrap"
            }}>
                <div>
                    {t(`${artworkReview.type}`)} : {artworkReview.name}
                </div>
                <div>
                    {t("Score") + ": " + reviewScore + "/10"}
                </div>
            </Container>
        </Card.Title>
    );
};

export default ReviewItemTitle;