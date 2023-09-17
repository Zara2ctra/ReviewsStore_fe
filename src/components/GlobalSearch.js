import React from 'react';
import {Button, Form} from "react-bootstrap";
import {BiSearchAlt} from "react-icons/bi";

const GlobalSearch = ({themeMode, t}) => {
    return (
        <Form className="d-flex">
            <Form.Control
                data-bs-theme={themeMode}
                type="search"
                placeholder={t("Search")}
                className="me-2"
                aria-label="Search"
            />
            <Button
                variant={themeMode}
            >
                <BiSearchAlt/>
            </Button>
        </Form>
    );
};

export default GlobalSearch;