import React, {useContext, useEffect, useState, useRef} from 'react';
import { PrimeReactProvider} from 'primereact/api';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import UserPageHeader from "../components/UserPageHeader";
import UserPageReviews from "../components/UserPageReviews";
import {fetchNumberLikes} from "../http/likeAPI";
import {fetchPageData} from "../http/reviewAPI";
import {getOneUser} from "../http/userAPI";
import {Toast} from "primereact/toast";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const UserPage = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context);
    const {id} = useParams();
    const toast = useRef(null);
    const [pageData, setPageData] = useState({
        reviewNumber: 0,
        reviews: [],
        likesNumber: 0,
        userData: {}
    });

    const isYour = user.id == id;
    const isAdmin = user.isAdmin;
    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const fetchUserData = async () => {
        const {count} = await fetchPageData(id);
        const likesNumber = await fetchNumberLikes(id);
        const userData = await getOneUser(id)

        setPageData({
            ...pageData,
            reviewNumber: count,
            likesNumber: likesNumber,
            userData: userData
        })
    }

    useEffect( () => {
        fetchUserData()
    }, [id])

    return (
        <Container style={{marginBottom: "2rem"}}>
            <Toast ref={toast}/>
            <UserPageHeader
                themeMode={themeMode}
                themeColors={themeColors}
                reviewNumber={pageData.reviewNumber}
                userData={pageData.userData}
                likesNumber={pageData.likesNumber}
                t={t}
            />
            <PrimeReactProvider>
                <UserPageReviews
                    themeMode={themeMode}
                    isYour={isYour}
                    isAdmin={isAdmin}
                    userId={id}
                    toast={toast}
                    t={t}
                />
            </PrimeReactProvider>
        </Container>
    );
})

export default UserPage;