import React, {useContext, useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {blankMarkDown, REVIEW_ROUTE, TYPES_EN} from "../utils/consts";
import {createArtWork, createReview} from "../http/reviewAPI";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CreateReview = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context)
    const [file, setFile] = useState('');
    const [artworkType, setArtworkType] = useState('');
    const [artworkName, setArtworkName] = useState('');
    console.log(artworkType)
    const [score, setScore] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState(blankMarkDown);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const handleChangeType = (e) => {
        setArtworkType(e.target.value)
    }

    const handleChangeArtWork = (e) => {
        setArtworkName(e.target.value)
    }

    const handleChangeScore = (e) => {
        if (e.target.value >= 0 && e.target.value <= 10) {
            setScore(e.target.value)
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const createFormData = () => {
        const data = new FormData();
        data.append('name', name);
        data.append('content_text', text);
        data.append('score', score);
        data.append('artWorkId', artwork.data.id);
        data.append('userId', user.id);
        data.append('file', file);

        return data
    }

    const sendReview = async () => {
        const artwork = await createArtWork(artworkName, t('en', `${artworkType}`));
        const formData = createFormData()
        const reviewResponse = await createReview(formData);
        navigate(REVIEW_ROUTE + "/" + reviewResponse);
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        } else {
            event.preventDefault();
            await i18n.changeLanguage('en');
           // await sendReview()
        }
        setValidated(true);
    };

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
    }

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
                                    onChange={handleChangeType}
                                    className={"mb-3 ms-4"}
                                    required
                                >
                                    <option
                                        disabled selected hidden
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
                                    placeholder={t("The name of your artwork")}
                                    value={artworkName}
                                    onChange={handleChangeArtWork}
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
                            placeholder={t("The name of your review")}
                            value={name}
                            onChange={handleChangeName}
                            required
                        />
                    </Form.Group>
                    <Form.Group className={"d-flex"} as={Col} md="3" controlId="validationCustom05">
                        <Form.Control
                            className={"mb-3"}
                            type="number"
                            placeholder={t("Score")}
                            min={0}
                            max={10}
                            value={score}
                            onChange={handleChangeScore}
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
                        value={text}
                        onChange={setText}
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