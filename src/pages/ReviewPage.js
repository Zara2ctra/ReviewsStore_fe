import React, {useContext, useEffect, useState} from 'react';
import socketIO from 'socket.io-client';
import useChat from "../hooks/useChat";
import MDEditor from '@uiw/react-md-editor';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, Image, ListGroup, Row} from "react-bootstrap";
import Stars from "../components/Stars";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CommentListItem from "../components/CommentListItem";
import {RiSendPlaneFill} from "react-icons/ri";
import {fetchOneReview} from "../http/reviewAPI";
import {myURL} from "../utils/consts";
import {BiLike, BiUserCircle} from "react-icons/bi";
import {useTranslation} from "react-i18next";

const socket = socketIO.connect(myURL);

const ReviewPage = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context);
    const [currentReview, setCurrentReview] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [artwork, setArtwork] = useState("");
    const [comment, setComment] = useState('');
    const {id} = useParams();
    const startChat = useChat(id);
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    useEffect(() => {
        const fetchData = async () => {
            const reviewData = await fetchOneReview(id);
            setCurrentReview(reviewData);
            setArtwork(reviewData.art_work);
            setUserInfo(reviewData.user);
        }

        fetchData().then(r => r);
    }, [])


    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleSendComment = (e) => {
        e.preventDefault()
        startChat.sendComment({comment_text: comment, userId: user.id, reviewId: id})
        setComment('')
    }

    const likeToggle = () => {
        console.log("LIKE")
    }

    return (
        <Container
            className="mt-3"
            data-bs-theme={themeMode}
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <Row style={{justifyContent: "center"}}>
                <Col md={4}>
                    <Image
                        border={themeMode}
                        width={300}
                        height={300}
                        src={currentReview.imageUrl}
                        thumbnail
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <Container style={{display: "flex"}}>
                            <Container>
                                <BiUserCircle
                                    style={{color: themeColors.text, fontSize: '3rem'}}
                                />
                            </Container>
                            <Container>
                                <span
                                    style={{fontSize: "2rem"}}
                                >
                                    {userInfo.name}
                                </span>
                            </Container>
                            <Container>
                                <BiLike
                                    style={{cursor: "pointer"}}
                                    onClick={() => likeToggle()}
                                />10
                            </Container>
                        </Container>
                        <h2>
                            {t(`${artwork.type}`)} : {artwork.name}</h2>
                        <Stars stars={currentReview.rating}/>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0 0 20px 0"}}>
                    {currentReview.name} {currentReview.score}/10
                </h1>
                <MDEditor.Markdown
                    source={currentReview.content_text}
                />
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
                {user.isAuth ?
                    <Form onSubmit={handleSendComment} style={{padding: "0"}}>
                        <Form.Group className='d-flex mt-2 gap-3'>
                            <Form.Control
                                value={comment}
                                onChange={handleChangeComment}
                                type='text'
                                placeholder={t('Write your opinion here...')}
                            />
                            <Button variant={themeMode} type='submit'>
                                <RiSendPlaneFill/>
                            </Button>
                        </Form.Group>
                    </Form>
                    :
                    <>
                    </>
                }
            </Row>
        </Container>
    );
});

export default ReviewPage;