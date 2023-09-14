import React, {useContext, useEffect, useState} from 'react';
import socketIO from 'socket.io-client';
import useChat from "../hooks/useChat";
import MDEditor from '@uiw/react-md-editor';
import {useParams} from "react-router-dom";
import {Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import Stars from "../components/Stars";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CommentListItem from "../components/CommentListItem";
import {fetchOneReview} from "../http/reviewAPI";
import {myURL} from "../utils/consts";
import {BiLike, BiUserCircle} from "react-icons/bi";
import {useTranslation} from "react-i18next";
import CommentFooter from "../components/CommentFooter";

const socket = socketIO.connect(myURL);

const ReviewPage = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context);
    const [currentReview, setCurrentReview] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [artwork, setArtwork] = useState("");
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
                    <Container className="d-flex flex-column align-items-center justify-content-center">
                        <div className={"d-flex"}>
                            <BiUserCircle
                                style={{color: themeColors.text, fontSize: '3rem'}}
                            />
                            <span
                                style={{fontSize: "2rem"}}
                            >
                                    {userInfo.name}
                                </span>
                            <BiLike
                                style={{cursor: "pointer"}}
                                onClick={() => likeToggle()}
                            />10
                        </div>
                        <h2>
                            {t(`${artwork.type}`)}: <br/>
                            {artwork.name}
                        </h2>
                    </Container>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3" data-color-mode={themeMode}>
                <h1 style={{padding: "0 0 20px 0"}}>
                    {currentReview.name} {currentReview.score}/10
                </h1>
                <MDEditor.Markdown
                    source={currentReview.content_text}
                />
                <Stars stars={currentReview.rating}/>
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
                <CommentFooter sendComment={startChat.sendComment} reviewId={id}/>
            </Row>
        </Container>
    );
});

export default ReviewPage;