import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadingSpinner = ({themeMode}) => (
    <div style={{
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
    >
        <Spinner animation="grow" variant={themeMode}/>
    </div>
);

export default LoadingSpinner;