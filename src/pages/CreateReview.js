import React, {useContext, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {blankMarkDown, REVIEW_ROUTE, TYPES_EN} from "../utils/consts";
import {createReview} from "../http/reviewAPI";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createArtWork} from "../http/artworkAPI";
import {languageMappings} from "../i18n";

const CreateReview = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context)
    const [formData, setFormData] = useState({
        file: '',
        artworkType: '',
        artworkName: '',
        score: '',
        name: '',
        text: blankMarkDown,
    });
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleChangeFile = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    }

    const createFormData = (artwork) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('content_text', formData.text);
        data.append('score', formData.score);
        data.append('artWorkId', artwork.data.id);
        data.append('userId', user.id);
        data.append('file', formData.file);
        return data
    }

    const sendReview = async () => {
        const currentLanguage = i18n.language;
        const englishTypeValue = languageMappings[currentLanguage][formData?.artworkType];
        const artwork = await createArtWork(formData.artworkName, englishTypeValue);
        const finalData = createFormData(artwork);
        const currentReviewId = await createReview(finalData);
        navigate(REVIEW_ROUTE + "/" + currentReviewId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await sendReview();
        }
        setValidated(true);
    };

    return (
        <Container
            className="mt-5"
            data-bs-theme={themeMode}
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row style={{flexDirection: "column"}}>
                    <Col md={4}>
                        <Row className="d-flex flex-column align-items-center">
                            <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom01">
                                <Form.Select
                                    name="artworkType"
                                    onChange={handleChange}
                                    className={"mb-3 ms-4"}
                                    required
                                >
                                    <option
                                        value=""
                                        disabled
                                        selected
                                        hidden
                                    >
                                        {t('Choose the type of artwork')}
                                    </option>
                                    {TYPES_EN.map((type) => {
                                        return (
                                            <option key={type}>{t(`${type}`)}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom02">
                                <Form.Control
                                    type="text"
                                    name="artworkName"
                                    placeholder={t("The name of your artwork")}
                                    value={formData.artworkName}
                                    onChange={handleChange}
                                    className={"mb-3 ms-4"}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className={"d-flex"} as={Col} md="12" controlId="validationCustom03">
                                <Form.Control
                                    type="file"
                                    name="img"
                                    className={"mb-3 ms-4"}
                                    onChange={handleChangeFile}
                                    required
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
                <Row className="m-3">
                    <Form.Group as={Col} md="6" style={{padding: "0 0  0 7px"}} controlId="validationCustom04">
                        <Form.Control
                            className={"mb-3"}
                            type="text"
                            name="name"
                            placeholder={t("The name of your review")}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
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
                        onChange={(value) => setFormData({ ...formData, text: value })}
                        required
                    />
                </Row>
                <Row>
                    <Button
                        className={"mt-3"}
                        variant={themeMode}
                        type="submit"
                    >
                        {t('Submit review')}
                    </Button>
                </Row>
            </Form>
        </Container>
    );
});

export default CreateReview;