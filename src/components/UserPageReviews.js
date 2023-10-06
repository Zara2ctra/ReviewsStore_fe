import React, {useEffect, useState} from 'react';
import "primereact/resources/primereact.min.css";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {emptyReview, themeSwitcher} from "../utils/utils";
import {Container} from "react-bootstrap";
import {FilterMatchMode} from "primereact/api"
import {deleteMultipleReviews, deleteOneReview, fetchPageData} from "../http/reviewAPI";
import {format} from "date-fns";
import {IoTrashBinSharp} from "react-icons/io5";
import {FiEdit2} from "react-icons/fi";
import DeleteReviewsModal from "./DeleteReviewsModal";
import DeleteReviewModal from "./DeleteReviewModal";
import TableHeader from "./TableHeader";
import {useNavigate} from "react-router-dom";
import {REVIEW_ROUTE, REVIEW_ROUTE_EDIT} from "../utils/consts";
import {BsEyeFill} from "react-icons/bs";
import {useTranslation} from "react-i18next";


const UserPageReviews = ({themeMode, reviewsData, isAdmin, isYour, userId, toast}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [reviews, setReviews] = useState(reviewsData);
    const [selectedReviews, setSelectedReviews] = useState(null);
    const [deleteReviewDialog, setDeleteReviewDialog] = useState(false);
    const [deleteReviewsDialog, setDeleteReviewsDialog] = useState(false);
    const [review, setReview] = useState(emptyReview);
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })

    const fetchReviewsData = async () => {
        const reviewsData = await fetchPageData(userId);
        reviewsData.reviews.map((review) =>
            review.createdAt = format(
                new Date(review?.createdAt),
                'dd.MM.yyyy HH:mm'
            )
        )

        setReviews(reviewsData.reviews,)
    }

    useEffect(() => {
        fetchReviewsData()
    }, [userId]);

    useEffect(() => {
        themeSwitcher.darkThemeSwitch(themeMode)
    }, [themeMode])

    const navigateReview = (reviewId) => {
        navigate(REVIEW_ROUTE + `/${reviewId}`)
    }

    const hideDeleteReviewDialog = () => {
        setDeleteReviewDialog(false);
    };

    const hideDeleteReviewsDialog = () => {
        setDeleteReviewsDialog(false);
    };

    const confirmDeleteReview = (product) => {
        setReview(product);
        setDeleteReviewDialog(true);
    };

    const deleteReview = async () => {
        let _reviews = reviews.filter((val) => val.id !== review.id);
        setReviews(_reviews);
        setDeleteReviewDialog(false);
        setReview(emptyReview);
        toast.current.show({severity: 'success', summary: 'Successful', detail: t('Review Deleted'), life: 3000});
        await deleteOneReview(review.id)
    };

    const confirmDeleteSelected = () => {
        setDeleteReviewsDialog(true);
    };

    const deleteSelectedReviews = async () => {
        const reviewsIds = []
        let _reviews = reviews.filter((review) => {
            if (!selectedReviews.includes(review)) {
                return true
            }
            reviewsIds.push(review.id)
        })

        setReviews(_reviews);
        setDeleteReviewsDialog(false);
        setSelectedReviews(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: t('Reviews Deleted'), life: 3000});
        await deleteMultipleReviews(reviewsIds)
    };

    const editReview = (rowData) => {
        navigate(REVIEW_ROUTE_EDIT + `/${rowData.id}`)
    }

    const Types = (rowData) => {
        return (
            t(`${rowData.art_work.type}`)
        )
    }

    const TableActions = (rowData) => {
        return (
            isYour || isAdmin ? (
                <Container className={"d-flex gap-3"}>
                    <FiEdit2
                        style={{fontSize: "1.5rem", cursor: "pointer"}}
                        onClick={() => editReview(rowData)}
                    />
                    <IoTrashBinSharp
                        style={{fontSize: "1.5rem", cursor: "pointer"}}
                        onClick={() => confirmDeleteReview(rowData)}
                    />
                    <BsEyeFill
                        style={{fontSize: "1.5rem", cursor: "pointer"}}
                        onClick={() => navigateReview(rowData.id)}
                    />
                </Container>
            ) : (
                <Container className={"d-flex gap-3"}>
                    <BsEyeFill
                        style={{fontSize: "1.5rem", cursor: "pointer"}}
                        onClick={() => navigateReview(rowData.id)}
                    />
                </Container>
            )
        );
    }

    return (
        <Container className="mt-5">
            <DataTable
                value={reviews}
                header={<TableHeader
                    setFilters={setFilters}
                    isYour={isYour}
                    isAdmin={isAdmin}
                    confirmDeleteSelected={confirmDeleteSelected}
                    selectedReviews={selectedReviews}
                />}
                paginator rows={15}
                sortField="id"
                removableSort
                sortOrder={1}
                filters={filters}
                selectionMode='checkbox'
                selection={selectedReviews}
                onSelectionChange={(e) => {
                    setSelectedReviews(e.value)
                }}
                dataKey="id"
                tableStyle={{minWidth: '100%'}}
            >
                {isYour || isAdmin ?
                    (<Column selectionMode="multiple" headerStyle={{minWidth: '3rem%'}}></Column>)
                    :
                    (<></>)}
                <Column field="id" header="#" sortable style={{minWidth: '3rem'}}></Column>
                <Column field="name" header={t("Review Name")} sortable style={{minWidth: '12rem'}}></Column>
                <Column field="art_work.name" header={t("Artwork Name")} sortable style={{minWidth: '14rem'}}></Column>
                <Column field="art_work.type" header={t("Artwork Type")} body={Types} sortable style={{minWidth: '7rem'}}></Column>
                <Column field="score" header={t("Score")} sortable style={{minWidth: '5rem'}}></Column>
                <Column field="rating" header={t("Rating")} sortable style={{minWidth: '5rem'}}></Column>
                <Column field="createdAt" header={t("Created")} sortable style={{minWidth: '8rem'}}></Column>
                <Column header={t("Actions")} body={TableActions} style={{minWidth: '9rem'}}></Column>
            </DataTable>

            <DeleteReviewModal
                deleteReviewDialog={deleteReviewDialog}
                deleteReview={deleteReview}
                hideDeleteReviewDialog={hideDeleteReviewDialog}
                review={review}
            />

            <DeleteReviewsModal
                deleteReviewsDialog={deleteReviewsDialog}
                deleteSelectedReviews={deleteSelectedReviews}
                hideDeleteReviewsDialog={hideDeleteReviewsDialog}
                review={review}
            />
        </Container>
    );
};

export default UserPageReviews;