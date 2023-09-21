import React from 'react';
import {BsExclamationTriangle} from "react-icons/bs";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

const DeleteReviewModal = ({deleteReviewDialog, hideDeleteReviewDialog, review, t, deleteReview}) => {

    const deleteReviewDialogFooter = (
        <React.Fragment>
            <Button label={t("No")} outlined onClick={hideDeleteReviewDialog}/>
            <Button label={t("Yes")} outlined severity="danger" onClick={deleteReview}/>
        </React.Fragment>
    );

    return (
        <Dialog
            header={t("Confirm")}
            visible={deleteReviewDialog}
            style={{width: '32rem', margin: "auto"}}
            onHide={hideDeleteReviewDialog}
            footer={deleteReviewDialogFooter}
        >
            <div style={{display: "flex", justifyContent: "center"}}>
                {review && (
                    <div>
                        <BsExclamationTriangle
                            style={{fontSize: '2rem'}}
                        /> {t('Are you sure you want to delete')} <b>{t('the review')}</b>?
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default DeleteReviewModal;