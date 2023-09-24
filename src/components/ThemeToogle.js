import React from 'react';
import {Form} from 'react-bootstrap'
import {FiMoon, FiSun} from "react-icons/fi";

const ThemeToggle = ({isDarkMode, handleThemeToggle, themeColors}) => (
    <Form.Check
        type="switch"
        id="custom-switch"
        label={isDarkMode ?
            <FiMoon style={{color: themeColors.text}}/>
            :
            <FiSun style={{color: themeColors.text}}/>}
        onClick={handleThemeToggle}
    />
);

export default ThemeToggle;