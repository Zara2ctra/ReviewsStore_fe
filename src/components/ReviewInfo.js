import React, {useContext} from 'react';
import {Container, Image} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Stars from './Stars';
import {BiLike, BiUserCircle} from "react-icons/bi";
import {Context} from "../index";
import {format} from "date-fns";

const ReviewInfo = ({reviewData, isSmallScreen, handleRating, toggleLikeHandler, themeMode, themeColors}) => {
    const {user} = useContext(Context)
    const {t} = useTranslation();
    console.log(reviewData)
    const reviewCreatedDate = new Date(reviewData?.reviewInfo?.createdAt || new Date());

    return (
        <div style={{
            display: "inline-flex",
            flexDirection: isSmallScreen ? "column-reverse" : "row",
            alignItems: "flex-start",
            width: "100%"
        }}>
            <Container style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Image
                    border={themeMode}
                    width={300}
                    height={300}
                    src={reviewData.reviewInfo.imageUrl}
                    thumbnail
                />
                <Stars
                    rate={reviewData.rating}
                    handler={handleRating}
                    isAuth={false}
                /> {t("average")} {reviewData.rating} ({reviewData.ratingCount} {t("times rated")})
            </Container>
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h2>
                    {t(`${reviewData.artwork.type}`)}: <br/>
                    {reviewData.artwork.name}
                </h2>
                <div
                    style={{
                        display: "inline-flex",
                        cursor: user.isAuth ? "pointer" : ""
                    }}
                    onClick={user.isAuth ?
                        toggleLikeHandler
                        :
                        () => user.isAuth
                    }
                >
                    <BiUserCircle style={{color: themeColors.text, fontSize: '3rem'}}/>
                    <span style={{fontSize: "1.5rem"}}>
                            {reviewData.userInfo.name}
                        </span>
                    {reviewData.likeStatus ? (
                        <BiLike
                            style={{
                                color: "green",
                            }}
                        />
                    ) : (
                        <BiLike
                            style={{
                                color: themeColors.text,
                            }}
                        />
                    )
                    }
                    <span>
                            {reviewData.likesNumber}
                    </span> <br/>
                    {format(reviewCreatedDate, 'dd.MM.yyyy HH:mm')}
                </div>
            </Container>
        </div>
    );
};

export default ReviewInfo;