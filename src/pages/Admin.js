import React, {useContext, useEffect, useState, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {FilterMatchMode, PrimeReactProvider} from "primereact/api";
import {useTranslation} from "react-i18next";
import {Context} from "../index";
import {deleteMultipleReviews, deleteOneReview, fetchReviews} from "../http/reviewAPI";
import {Toast} from "primereact/toast";
import {emptyReview, themeSwitcher} from "../utils/utils";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Container} from "react-bootstrap";
import TableHeader from "../components/TableHeader";
import {FiEdit2} from "react-icons/fi";
import {IoTrashBinSharp} from "react-icons/io5";
import {BsEyeFill} from "react-icons/bs";
import {REVIEW_ROUTE, REVIEW_ROUTE_EDIT, USER_PROFILE_ROUTE} from "../utils/consts";
import DeleteReviewModal from "../components/DeleteReviewModal";
import DeleteReviewsModal from "../components/DeleteReviewsModal";

const Admin = observer(() => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const [data, setData] = useState([]);
    const [selectedReviews, setSelectedReviews] = useState(null);
    const [deleteReviewDialog, setDeleteReviewDialog] = useState(false);
    const [deleteReviewsDialog, setDeleteReviewsDialog] = useState(false);
    const [review, setReview] = useState(emptyReview);
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })

    const toast = useRef(null);
    let themeMode = user.themeMode;

    const fetchUsersData = async () => {
        const reviewsData = await fetchReviews();

        reviewsData.map((review) =>
            review.createdAt = format(
                new Date(review?.createdAt),
                'dd.MM.yyyy HH:mm'))

        setData(reviewsData)
    }

    useEffect( () => {
        fetchUsersData()
    }, [])

    useEffect(() => {
        themeSwitcher.darkThemeSwitch(themeMode)
    }, [themeMode])

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
        let _reviews = data.filter((val) => val.id !== review.id);
        setData(_reviews);
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
        let _reviews = data.filter((review) => {
            if (!selectedReviews.includes(review)) {
                return true
            }
            reviewsIds.push(review.id)
        })

        setData(_reviews);
        setDeleteReviewsDialog(false);
        setSelectedReviews(null);
        toast.current.show({severity: 'success', summary: 'Successful', detail: t('Reviews Deleted'), life: 3000});
        await deleteMultipleReviews(reviewsIds)
    };


    const navigateReview = (reviewId) => {
        navigate(REVIEW_ROUTE + `/${reviewId}`)
    }

    const navigateUserPage = (userId) => {
        navigate(USER_PROFILE_ROUTE + `/${userId}`)
    }

    const editReview = (rowData) => {
        navigate(REVIEW_ROUTE_EDIT + `/${rowData.id}`)
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <div
                style={{cursor: "pointer", width: "150px"}}
                onClick={() =>navigateUserPage(rowData.user.id)}
            >
                <span className="font-bold">id: {rowData?.user?.id}</span><br/>
                <span className="font-bold">{t("name")}: {rowData?.user?.name}</span><br/>
                <span className="font-bold" style={{wordWrap: "break-word"}}>email:{rowData?.user?.email}</span>
            </div>
        );
    };

    const Types = (rowData) => {
        return (
            t(`${rowData.art_work.type}`)
        )
    }

    const AdminActions = (rowData) => {
        return (
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
        )
    }

    return (
        <Container className="mt-5 mb-5">
            <PrimeReactProvider>
                <Toast ref={toast}/>
                <DataTable
                    header={<TableHeader
                        setFilters={setFilters}
                        isYour={true}
                        isAdmin={true}
                        confirmDeleteSelected={confirmDeleteSelected}
                        selectedReviews={selectedReviews}
                        t={t}
                    />}
                    value={data}
                    rowGroupMode="rowspan" groupRowsBy="user.email"
                    paginator rows={30}
                    sortField="user.id" removableSort sortOrder={1}
                    filters={filters}
                    selectionMode='checkbox' selection={selectedReviews}
                    onSelectionChange={(e) => {setSelectedReviews(e.value)}}
                    dataKey="id" tableStyle={{minWidth: '100%'}}
                >
                    <Column selectionMode="multiple" headerStyle={{width: '8%'}}></Column>
                    <Column field="user.email" header={t("User info")} body={representativeBodyTemplate} style={{width: '11%'}}></Column>
                    <Column field="id" header={t("Review id")} sortable style={{width: '3%'}}></Column>
                    <Column field="art_work.name" header={t("Artwork Name")} style={{width: '15%'}}></Column>
                    <Column field="art_work.type" header={t("Artwork Type")} body={Types} sortable style={{width: '13%'}}></Column>
                    <Column field="name" header={t("Review Name")} style={{width: '15%'}}></Column>
                    <Column field="createdAt" header={t("Created")} sortable style={{width: '14%'}}></Column>
                    <Column header={t("Actions")} body={AdminActions} style={{width: '10%'}}></Column>
                </DataTable>

                <DeleteReviewModal
                    deleteReviewDialog={deleteReviewDialog}
                    deleteReview={deleteReview}
                    hideDeleteReviewDialog={hideDeleteReviewDialog}
                    review={review}
                    t={t}
                />

                <DeleteReviewsModal
                    deleteReviewsDialog={deleteReviewsDialog}
                    deleteSelectedReviews={deleteSelectedReviews}
                    hideDeleteReviewsDialog={hideDeleteReviewsDialog}
                    review={review}
                    t={t}
                />
            </PrimeReactProvider>
        </Container>
    );
});

export default Admin;