import React from 'react';
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const Stars = ({stars}) => {
    const {t, i18n} = useTranslation();
    const ratingStar = Array.from({length: 5}, (elem, index) => {
        let number = index + 0.5;

        return <span key={index}>
            {
                stars >= index + 1
                    ? <FaStar/>
                    : stars >= number
                        ? <FaStarHalfAlt/>
                        : <AiOutlineStar/>
            }
        </span>


    });


    return (
        <Container style={{textAlign: "end"}}>
            {ratingStar}
            <p>
                {stars} {t('average')}
            </p>
        </Container>)
};

export default Stars;