import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {TYPES_EN} from "../utils/consts";
import {useTranslation} from "react-i18next";

const ArtworkInfo = ({handleChange, formData, nameError, handleChangeFile, isEditMode}) => {
    const {t} = useTranslation();

    return (
        <Row style={{flexDirection: "column"}}>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom01">
                        {isEditMode ? (
                            <Form.Select
                                name="artworkType"
                                onChange={handleChange}
                                className={"mb-3 ms-4"}
                                required
                            >
                                <option value="" disabled selected hidden>
                                    {t(`${formData.artworkType}`)}
                                </option>
                                {TYPES_EN.map((type) => {
                                    return (
                                        <option key={type}>{t(`${type}`)}</option>
                                    )
                                })}
                            </Form.Select>
                        ) : (
                            <Form.Select
                                name="artworkType"
                                onChange={handleChange}
                                className={"mb-3 ms-4"}
                                required
                            >
                                <option value="" disabled selected hidden>
                                    {t('Choose the type of artwork')}
                                </option>
                                {TYPES_EN.map((type) => {
                                    return (
                                        <option key={type}>{t(`${type}`)}</option>
                                    )
                                })}
                            </Form.Select>
                        )}
                    </Form.Group>
                    <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom02">
                        <Form.Control
                            type="text"
                            name="artworkName"
                            placeholder={t("The name of your artwork")}
                            value={formData.artworkName}
                            onChange={handleChange}
                            className={"mb-3 ms-4"}
                            isInvalid={!!nameError}
                            required
                        />
                        {nameError && (
                            <Form.Control.Feedback type="invalid">
                                {nameError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom03">
                        <Form.Control
                            type="file"
                            name="img"
                            className={"mb-3 ms-4"}
                            onChange={handleChangeFile}
                        />
                        {nameError && (
                            <Form.Control.Feedback type="invalid">
                                {nameError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Row>
            </Col>
        </Row>
    );
};

export default ArtworkInfo;