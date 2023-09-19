import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {BiUserCircle} from "react-icons/bi";
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import UserPageHeader from "../components/UserPageHeader";
import UserPageReviews from "../components/UserPageReviews";

const UserPage = observer(() => {
    const {user} = useContext(Context);
    const {id} = useParams();
    const [reviewsData, setReviewsData] = useState("");
    const [userData, setUserData] = useState("")

    const isYour = user.id === id;
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;


    const fetchData = async () => {
        setReviewsData(null);
    }

    useEffect(() => {
        fetchData().then(r => r);
    }, [id])


    return (
        <Container>
            <UserPageHeader themeMode={themeMode} themeColors={themeColors} userData={userData}/>
            <UserPageReviews themeMode={themeMode} themeColors={themeColors} reviewsData={reviewsData}/>
        </Container>
    );
})

export default UserPage;