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

const socket = socketIO.connect('https://reviews-storebe.onrender.com:10000');

const ReviewPage = observer(() => {
    const {user} = useContext(Context);
    const [currentReview, setCurrentReview] = useState("")
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
        }

        fetchData().then(r => r);
    }, [])


    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleSendComment = (e) => {
        e.preventDefault()
        startChat.sendMessage({comment_text: comment, userId: user.id, reviewId: id})
        setComment('')
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
                        <h2>{artwork.type} : {artwork.name}</h2>
                        <Stars stars={currentReview.rating}/>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0"}}>
                    {currentReview.name} {currentReview.score}/10
                </h1>
                <MDEditor.Markdown
                    source={currentReview.content_text}
                />
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 style={{padding: "0"}}>
                    Comments:
                </h1>
                <ListGroup style={{background: themeColors.background}}>
                    {startChat.comments.map((comment) => (
                        <CommentListItem
                            key={comment.id}
                            comment={comment}
                            themeMode={themeMode}
                            themeColors={themeColors}
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
                                placeholder='Write your opinion here...'
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