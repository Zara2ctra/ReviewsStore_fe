import React, {useContext, useState} from 'react';
import {MdExpandMore} from "react-icons/md"
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import Stars from "./Stars";

const PopularReviews = () => {
    const {user} = useContext(Context);
    const {review} = useContext(Context)
    let themeColor = user.themeColors;
    let themeMode = user.themeMode;
    const [currentReview, setCurrentReview] = useState(() => getSortedReviews(review.reviews, 2));

    function getSortedReviews(review, n) {
        return review.sort((a, b) => {
            return b.rating - a.rating;
        }).slice(0, n)
    }

    const onGetMoreReviews = () => {
        setCurrentReview(() => getSortedReviews(review.reviews).slice(0, 6))
    }


    return (
        <Container
            className={"mt-5"}
            style={{color: themeColor.text}}
        >
            <h2>
                Popular reviews
            </h2>
            <Row
                xs={1} md={1} className="g-4"
            >
                {currentReview.map((review) => (
                    <Col
                        key={review.id}
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
                                            {review.title}
                                        </p>
                                    </div>
                                    <div
                                        style={{textAlign: "end"}}
                                    >
                                        <Stars stars={review.rating}/>
                                    </div>
                                </Card.Title>
                                <Card.Text >
                                    {review.content_text.length > 150 ?
                                        review.content_text.slice(0, 150) + "..."
                                        :
                                        review.content_text
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {currentReview.length < 4 ? (
                <Button
                    className="mx-auto d-block"
                    style={{width: "30rem", marginTop: "1rem"}}
                    variant={themeMode}
                    onClick={() => onGetMoreReviews()}
                >
                    <MdExpandMore/>
                </Button>
            ) : (
                <></>)
            }
        </Container>
    );
};

export default PopularReviews;