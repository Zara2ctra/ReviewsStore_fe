import React from 'react';
import {Container} from "react-bootstrap";
import {BiUserCircle} from "react-icons/bi";
import {useTranslation} from "react-i18next";

const UserPageHeader = ({themeMode, themeColors, userData, reviewNumber, likesNumber}) => {
    const {t} = useTranslation();

    return (
        <Container
            className={`mt-5 d-flex justify-content-between gap-3`}
            border={themeMode}
            data-bs-theme={themeMode}
            data-color-mode={themeMode}
            style={{color: themeColors.text}}
        >
            <div>
                <h4 className="mb-0 mt-0">
                    <BiUserCircle style={{fontSize: '5rem'}}/>{userData?.name}
                </h4>
            </div>
            <div className={"d-flex gap-3"}>
                <div className={`p-2 mt-2 d-flex bg-${themeMode} rounded justify-content-center align-items-center`}
                     style={{width: "9rem"}}
                >
                    <span>{t('Reviews')}: {reviewNumber}</span>
                </div>
                <div className={`p-2 mt-2 d-flex bg-${themeMode} rounded justify-content-center align-items-center`}
                    style={{width: "9rem"}}
                >
                    <span>{t('Likes')}: {likesNumber}</span>
                </div>
            </div>
        </Container>
    );
};

export default UserPageHeader;