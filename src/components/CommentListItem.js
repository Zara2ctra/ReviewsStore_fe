import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {BiUserCircle} from "react-icons/bi";

const CommentListItem = ({comment, themeMode, themeColors}) => {
    return (
        <ListGroup.Item
            style={{background: themeColors.background, border: "none"}}
            className={"d-flex"}
        >
            <Card
                style={{
                    color: themeColors.text,
                    backgroundColor: themeColors.background,
                    textAlign: "center",
                    width: "100%%",
                }}
            >
                <Card.Body className='d-flex align-items-center gap-2'>
                    <BiUserCircle
                        style={{color: themeColors.text, fontSize: '2rem'}}
                    />
                    <Card.Text>{comment.text}</Card.Text>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
};

export default CommentListItem;