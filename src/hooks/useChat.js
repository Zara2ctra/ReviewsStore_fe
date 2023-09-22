import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
const SERVER_URL = process.env.REACT_APP_SERVER_URL_WS

const useChat = (reviewId) => {
    const [comments, setComments] = useState([]);
    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = io(SERVER_URL, {
            query: {reviewId: reviewId}
        })
        socketRef.current.emit('comment:get')
        socketRef.current.on('comments', (comments) => {
            setComments(comments)
        })
        return () => {
            socketRef.current.disconnect()
        }
    }, [reviewId])

    const sendComment = ({ comment_text, userId, reviewId}) => {
        socketRef.current.emit('comment:add', {
            comment_text,
            userId,
            reviewId
        })
    }

    const removeComment = (id) => {
        socketRef.current.emit('comment:remove', id)
    }

    return {comments, sendComment, removeComment}
}

export default useChat