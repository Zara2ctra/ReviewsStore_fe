import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:5000/'

const useChat = (reviewId) => {
    console.log(reviewId)
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

    const sendMessage = ({ comment_text, userId, reviewId}) => {
        socketRef.current.emit('comment:add', {
            comment_text,
            userId,
            reviewId
        })
    }

    return {comments, sendMessage}
}

export default useChat