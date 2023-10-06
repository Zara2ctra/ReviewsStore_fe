import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {blankMarkDown, REVIEW_ROUTE} from "../utils/consts";
import {createReview, editReview, fetchOneReview} from "../http/reviewAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createOrGetArtWork} from "../http/artworkAPI";
import {languageMappings} from "../i18n";
import Alert404 from "../components/404";
import ManipulateReviewInfo from "../components/ManipulateReviewInfo";
import LoadingSpinner from "../components/LoadingSpinner";

const ReviewManipulator = observer(() => {
    const {t, i18n} = useTranslation();
    const {user} = useContext(Context)
    const [formData, setFormData] = useState({
        file: '',
        artworkType: '',
        artworkName: '',
        score: '',
        name: '',
        text: blankMarkDown,
        isYouReview: false,
    });
    const [validated, setValidated] = useState(false);
    const [nameError, setNameError] = useState('');
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const {id} = useParams()
    const isEditMode = !!id;

    let themeColors = user.themeColors;
    let themeMode = user.themeMode;

    const putReviewData = async (id) => {
        const reviewData = await fetchOneReview(id);
        const isYouReview = user.id == reviewData.user.id || user.isAdmin;
        setFormData({
            artworkType: reviewData.art_work.type,
            artworkName: reviewData.art_work.name,
            score: reviewData.score,
            name: reviewData.name,
            text: reviewData.content_text,
            isYouReview: isYouReview
        })
    }

    useEffect(() => {
        if (isEditMode) {
            setLoading(true)
            putReviewData(id).then(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (value.length > 90) {
            setNameError(t('The value can\'t be that long'));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            setNameError('');
        }
    }

    const handleChangeFile = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    }

    const createFormData = (artworkId) => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('content_text', formData.text);
        data.append('score', formData.score);
        data.append('artWorkId', artworkId);
        data.append('userId', user.id);
        data.append('file', formData.file);
        return data
    }

    const sendReview = async () => {
        const currentLanguage = i18n.language;
        const englishTypeValue = languageMappings[currentLanguage][formData?.artworkType];
        const artwork = await createOrGetArtWork(formData.artworkName, englishTypeValue);
        const finalData = createFormData(artwork.id)
        const currentReviewId = await createReview(finalData);
        navigate(REVIEW_ROUTE + "/" + currentReviewId);
    };

    const changeReview = async () => {
        const currentLanguage = i18n.language;
        const englishTypeValue = languageMappings[currentLanguage][formData?.artworkType];
        const artwork = await createOrGetArtWork(formData.artworkName, englishTypeValue);
        const finalData = createFormData(artwork.id)
        const currentReviewId = await editReview(finalData, id);
        navigate(REVIEW_ROUTE + "/" + currentReviewId);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !!nameError) {
            event.stopPropagation();
        } else {
            isEditMode ?
                await changeReview()
                :
                await sendReview()
        }
        setValidated(true);
    };

    return (
        loading ? <LoadingSpinner themeMode={themeMode}/>
            :
        <Container
            className="mt-5 mb-5"
            data-bs-theme={themeMode}
            style={{color: themeColors.text, backgroundColor: themeColors.background}}
        >
            {isEditMode && !formData.isYouReview ? (
                <Alert404/>
            ) : (
                <ReviewManipulator
                    validated={validated}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    handleChange={handleChange}
                    nameError={nameError}
                    handleChangeFile={handleChangeFile}
                    isEditMode={isEditMode}
                    themeMode={themeMode}
                    setFormData={setFormData}
                />
            )}
        </Container>
    );
});

export default ReviewManipulator;