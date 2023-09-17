import React from 'react';
import {Form} from 'react-bootstrap'
import {FiMoon, FiSun} from "react-icons/fi";

const ThemeToggle = ({isDarkMode, handleThemeToggle}) => (
    <Form.Check
        type="switch"
        id="custom-switch"
        label={isDarkMode ?
            <FiMoon style={{color: 'white'}}/>
            :
            <FiSun style={{color: 'white'}}/>}
        onClick={handleThemeToggle}
    />
);

export default ThemeToggle;