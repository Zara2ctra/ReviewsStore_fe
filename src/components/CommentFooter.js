import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {RiSendPlaneFill} from "react-icons/ri";
import {useTranslation} from "react-i18next";

const CommentFooter = ({sendComment, reviewId, user}) => {
    const {t} = useTranslation();
    const [comment, setComment] = useState('');
    let themeMode = user.themeMode;

    const handleSendComment = (e) => {
        e.preventDefault()
        sendComment({comment_text: comment, userId: user.id, reviewId: reviewId})
        setComment('')
    }

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    return (
        user.isAuth ?
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
    )
}

export default CommentFooter;