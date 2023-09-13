import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import Stars from "./Stars";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";
import MDEditor from "@uiw/react-md-editor";

const ReviewItem = ({review, themeMode}) => {
    const navigate = useNavigate();

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
                style={{width: "100%"}}
            >
                <Card.Body>
                    <Card.Title className={"d-flex justify-content-between"}>
                        <div style={{textAlign: "center"}}>
                            <p>
                                {review.art_work.name} {review.score + "/10"}
                            </p>
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
                                source={review.content_text.slice(0,200) + "..."}
                            />
                            :
                            <MDEditor.Markdown
                                source={review.content_text}
                            />
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
};

export default ReviewItem;