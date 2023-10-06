import React from 'react';
import {BsExclamationTriangle} from "react-icons/bs";
import {Dialog} from "primereact/dialog";
import {Container} from "react-bootstrap";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";

const DeleteReviewsModal = ({deleteReviewsDialog, hideDeleteReviewsDialog, review, deleteSelectedReviews}) => {
    const {t} = useTranslation();

    const deleteReviewsDialogFooter = (
        <Container>
            <Button label={t("No")} outlined onClick={hideDeleteReviewsDialog}/>
            <Button label={t("Yes")} outlined severity="danger" onClick={deleteSelectedReviews}/>
        </Container>
    );

    return (
        <Dialog
            header={t("Confirm")}
            visible={deleteReviewsDialog}
            style={{width: '32rem', margin: "auto"}}
            onHide={hideDeleteReviewsDialog}
            footer={deleteReviewsDialogFooter}
        >
            <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                {review && (
                    <div>
                        <BsExclamationTriangle
                            style={{fontSize: '2rem'}}
                        /> {t('Are you sure you want to delete')} <b>{t('the selected reviews?')}</b>
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default DeleteReviewsModal;