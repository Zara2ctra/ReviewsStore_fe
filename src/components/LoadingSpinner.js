import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadingSpinner = ({ user }) => (
    <div
        style={{
            height: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <Spinner animation="grow" variant={user.themeMode} />
    </div>
);

export default LoadingSpinner;