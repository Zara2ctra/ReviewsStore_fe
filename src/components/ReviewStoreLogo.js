import React from 'react';
import {Image} from "react-bootstrap";
import LogoSVG from "../utils/logo.svg";

const ReviewStoreLogo = ({themeColors, handleMain}) => {

    return (
        <Image
            onClick={handleMain}
            style={{
                color: themeColors.text,
                backgroundColor: themeColors.background,
                width: "15em",
                height: "5em"
            }}
            alt="logo"
            src={LogoSVG}
        />
    );
};

export default ReviewStoreLogo;