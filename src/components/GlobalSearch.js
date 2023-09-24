import React, {useEffect, useState} from 'react';
import {Button, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {BiSearchAlt} from "react-icons/bi";
import {fetchReviewsByQuery} from "../http/reviewAPI";
import {REVIEW_ROUTE} from "../utils/consts";

const GlobalSearch = ({themeMode, navigate, t}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchReviews = async () => {
        const data = await fetchReviewsByQuery(searchQuery);
        setSearchResults(data);

        if(data.length === 0) {
            setSearchResults([{art_work: {name: t("Not found"), type: ""}, id: 1}])
        }
    };

    useEffect(() => {
        searchReviews();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleReviewClick = (id) => {
        navigate(REVIEW_ROUTE + `/${id}`);
    };

    const renderPopover = () => (
        <Popover style={{cursor: "pointer"}} data-bs-theme={themeMode}>
            <Popover.Body>
                {searchResults.slice(0,8).map((result) => (
                    <p
                        key={result.id}
                        onClick={() => handleReviewClick(result.id)}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "50px"
                        }}
                    >
                        {result.art_work.name}
                        <span>
                            {result.art_work.type}
                        </span>
                    </p>
                ))}
            </Popover.Body>
        </Popover>
    );

    return (
        <Form className="d-flex">
            <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={renderPopover()}
            >
                <Form.Control
                    data-bs-theme={themeMode}
                    type="search"
                    placeholder={t('Search')}
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </OverlayTrigger>
            <Button variant={themeMode}>
                <BiSearchAlt/>
            </Button>
        </Form>
    );
};

export default GlobalSearch;