import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import Stars from "./Stars";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE} from "../utils/consts";

const ReviewItem = ({review, themeMode}) => {
    const navigate = useNavigate();

    function handleClickAuthorization(id) {
        navigate(REVIEW_ROUTE + `/${id}`);
    }

    return (
        <Col
            style={{cursor: "pointer"}}
            key={review.id}
            onClick={() => handleClickAuthorization(review.id)}
        >
            <Card
                border={themeMode}
                data-bs-theme={themeMode}
            >
                <Card.Body>
                    <Card.Title className={"d-flex justify-content-between"}>
                        <Image
                            width="66rem"
                            height="66rem"
                            src={review.imageUrl}
                            alt="review image"
                            className={"m-1"}
                            rounded
                        />
                        <div style={{textAlign: "center"}}>
                            <p>
                                {review.artWorkName} {review.score + "/10"}
                            </p>
                        </div>
                        <div
                            style={{textAlign: "end"}}
                        >
                            <Stars stars={review.rating}/>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {review.content_text.length > 150 ?
                            review.content_text.slice(0, 150) + "..."
                            :
                            review.content_text
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
};

export default ReviewItem;