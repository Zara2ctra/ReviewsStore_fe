import React, {useContext, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, Image, ListGroup, Row} from "react-bootstrap";
import Stars from "../components/Stars";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CommentListItem from "../components/CommentListItem";
import {RiSendPlaneFill} from "react-icons/ri";

const listStyles = {
    height: '100%',
}

const ReviewPage = observer(() => {
    const {user, review} = useContext(Context)
    const [text, setText] = useState('');
    const comments = [
        {
            text: "Отличный фильм! Очень понравилась игра актеров.",
            userId: 1,
            reviewId: 1,
        },
        {
            text: "Сюжет сложный, но интересный. Рекомендую посмотреть.",
            userId: 2,
            reviewId: 2,
        },
        {
            text: "Замечательная работа режиссера. Фильм оставил глубокие впечатления.",
            userId: 3,
            reviewId: 3,
        },
        {
            text: "Не понял сюжет, но спецэффекты поразили воображение.",
            userId: 4,
            reviewId: 4,
        },
        {
            text: "Фильм слишком длинный. Больше 3 часов - это перебор.",
            userId: 5,
            reviewId: 5,
        },
        {
            text: "Лучший фильм, который я видел в последнее время.",
            userId: 6,
            reviewId: 6,
        },
        {
            text: "Очень трогательный фильм. Закрыл все мои ожидания.",
            userId: 7,
            reviewId: 7,
        },
        {
            text: "Монтаж фильма оставляет желать лучшего.",
            userId: 8,
            reviewId: 8,
        },
        {
            text: "Неплохой вариант для проведения вечера.",
            userId: 9,
            reviewId: 9,
        },
        {
            text: "Смотрел в компании друзей. Все остались довольны.",
            userId: 10,
            reviewId: 10,
        },
        {
            text: "Великолепный фильм! Очень рекомендую.",
            userId: 11,
            reviewId: 11,
        },
        {
            text: "Забавная комедия. Хорошо поднимает настроение.",
            userId: 12,
            reviewId: 12,
        },
        {
            text: "Фильм подходит для любителей научной фантастики.",
            userId: 13,
            reviewId: 13,
        },
        {
            text: "Сюжет неожиданный и запоминающийся.",
            userId: 14,
            reviewId: 14,
        },
        {
            text: "Очень волнующая история с хорошей игрой актеров.",
            userId: 15,
            reviewId: 15,
        },
        {
            text: "Оценка 10/10. Фильм оправдал все ожидания.",
            userId: 16,
            reviewId: 16,
        },
        {
            text: "Смотрел в кинотеатре. Эффекты на большом экране впечатляют.",
            userId: 17,
            reviewId: 17,
        },
        {
            text: "Необычный сюжет. Фильм заставил задуматься.",
            userId: 18,
            reviewId: 18,
        },
        {
            text: "Не рекомендую. Фильм скучный и предсказуемый.",
            userId: 19,
            reviewId: 19,
        },
        {
            text: "Мой любимый фильм! Смотрю его уже второй раз.",
            userId: 20,
            reviewId: 20,
        },
    ];   ///////************************
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;
    const {id} = useParams();
    const currentReview = review.reviews[id - 1];


    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const handleSendComment = (e) => {
        e.preventDefault()
        // sendMessage({messageText: messageText, tagList: tags})
        setText('')
    }

    return (
        <Container
            className="mt-3"
            data-bs-theme={themeMode}
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <Row style={{justifyContent: "space-between"}}>
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
                        <h2>{currentReview.artWorkType}: {currentReview.artWorkName}</h2>
                        <Stars stars={currentReview.rating}/>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>{currentReview.name}</h1>
                <Row
                    data-color-mode={themeMode}
                >
                    <MDEditor.Markdown
                        source={currentReview.content_text}
                    />
                </Row>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Comments:</h1>
                <ListGroup style={{background: themeColors.background}}>
                    {comments.map((comment) => (
                        <CommentListItem
                            key={comment.id}
                            comment={comment}
                            themeMode={themeMode}
                            themeColors={themeColors}
                        />
                    ))}
                </ListGroup>
                <Form onSubmit={handleSendComment}>
                    <Form.Group className='d-flex mt-2 gap-3'>
                        <Form.Control
                            value={text}
                            onChange={handleChangeText}
                            type='text'
                            placeholder='Write your opinion here...'
                        />
                        <Button variant={themeMode} type='submit'>
                            <RiSendPlaneFill/>
                        </Button>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    );
});

export default ReviewPage;