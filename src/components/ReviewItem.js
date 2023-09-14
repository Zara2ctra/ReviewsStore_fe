import React, {useContext} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import Stars from "./Stars";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";
import MDEditor from "@uiw/react-md-editor";
import {BiLike, BiUserCircle} from "react-icons/bi";
import {Context} from "../index";
import {useTranslation} from "react-i18next";

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
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    let themeColor = user.themeColors;
    let themeMode = user.themeMode;

    function handleClickAuthorization(id) {
        navigate(REVIEW_ROUTE + `/${id}`);
    }

    return (
        <Col
            style={{cursor: "pointer", display: "flex"}}
            key={review.id}
            onClick={() => handleClickAuthorization(review.id)}
        >
            <Image
                width="150rem"
                height="150rem"
                src={review.imageUrl}
                alt="review image"
                className={"m-1"}
                border={themeMode}
                rounded
            />
            <Card
                border={themeMode}
                data-bs-theme={themeMode}
                data-color-mode={themeMode}
            >
                <Card.Body>
                    <Card.Title
                        className={"d-flex justify-content-between"}
                        style={{flexWrap: "wrap"}}
                    >
                        <div style={{display: "flex", gap: "0.5rem", flexWrap: "inherit"}}>
                            <BiUserCircle
                                style={{color: themeColor.text, fontSize: '3rem'}}
                            />
                            <span
                                style={{fontSize: "2rem"}}
                            >
                                {review.user.name}
                            </span>
                            <BiLike/><span>10</span>
                        </div>
                        <div>
                            <span
                                style={{textAlign: "center", fontSize: "2.5rem"}}
                            >
                                {t(`${review.art_work.type}`)} : {review.art_work.name} {review.score + "/10"}
                            </span>
                        </div>
                        <div
                            style={{textAlign: "end"}}
                        >
                            <Stars stars={review.rating}/>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {review.content_text.length > 200 ?
                            <MDEditor.Markdown
                                source={review.content_text.slice(0, 200) + "..."}
                            />
                            :
                            <MDEditor.Markdown
                                source={review.content_text}
                            />
                        }
                    </Card.Text>
                </Card.Body>
                <div
                    style={footerBlur}
                ></div>
            </Card>
        </Col>
    )
});

export default ReviewItem;