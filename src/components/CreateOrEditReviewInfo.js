import React from 'react';
import ArtworkInfo from "./ArtworkInfo";
import {Button, Col, Form, Row} from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";

const CreateOrEditReviewInfo = ({validated, handleSubmit, formData,
                                handleChange, nameError, handleChangeFile,
                                isEditMode, t, themeMode, setFormData
                            }) => {
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <ArtworkInfo
                handleChange={handleChange}
                formData={formData}
                nameError={nameError}
                handleChangeFile={handleChangeFile}
                isEditMode={isEditMode}
                t={t}
            />
            <Row className="m-3">
                <Form.Group as={Col} md="6" style={{padding: "0 0  0 7px"}} controlId="validationCustom04">
                    <Form.Control
                        className={"mb-3"}
                        type="text"
                        name="name"
                        placeholder={t("The name of your review")}
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!nameError}
                        required
                    />
                    {nameError && (
                        <Form.Control.Feedback type="invalid">
                            {nameError}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group className={"d-flex"} as={Col} md="3" controlId="validationCustom05">
                    <Form.Control
                        className={"mb-3"}
                        type="number"
                        name="score"
                        placeholder={t("Score")}
                        min={0}
                        max={10}
                        value={formData.score}
                        onChange={handleChange}
                        required
                    />
                    <h2 className={"ms-3"}>
                        /10
                    </h2>
                </Form.Group>
            </Row>
            <Row data-color-mode={themeMode}>
                <MDEditor
                    controlId="validationCustom05"
                    height={"100%"}
                    value={formData.text}
                    onChange={(value) => setFormData({...formData, text: value})}
                    required
                />
            </Row>
            <Row>
                <Button
                    className={"mt-3"}
                    variant={themeMode}
                    type="submit"
                >
                    {isEditMode ? (
                        t('Save')
                    ) : (
                        t('Submit review')
                    )}
                </Button>
            </Row>
        </Form>
    );
};

export default CreateOrEditReviewInfo;