import React from 'react';
import {Container} from "react-bootstrap";
import {BiUserCircle} from "react-icons/bi";

const UserPageHeader = ({themeMode, themeColors, userData}) => {
    return (
        <Container
            className={`mt-5 d-flex justify-content-start gap-3`}
            border={themeMode}
            data-bs-theme={themeMode}
            data-color-mode={themeMode}
            style={{color: themeColors.text}}
        >
            <h4 className="mb-0 mt-0">
                <BiUserCircle style={{fontSize: '5rem'}}/> Alex Morrison {userData?.userName}
            </h4>
            <div className={`p-2 mt-2 d-flex flex-column bg-${themeMode} rounded align-items-center`}>
                <span>Reviews</span>
                <span>38 {userData?.reviewsNumber}</span>
            </div>
            <div className={`p-2 mt-2 d-flex flex-column bg-${themeMode} rounded align-items-center`}>
                <span>Likes </span>
                <span>15 {userData?.likesNumber}</span>
            </div>
        </Container>
    );
};

export default UserPageHeader;