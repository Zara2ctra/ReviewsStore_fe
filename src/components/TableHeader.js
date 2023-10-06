import React from 'react';
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";
import {Button} from "primereact/button";
import {IoTrashBinSharp} from "react-icons/io5";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const TableHeader = ({setFilters,isAdmin, isYour, confirmDeleteSelected, selectedReviews}) => {
    const {t} = useTranslation();

    return (
        <Container className="d-flex justify-content-between">
            <div>
                <span style={{fontSize: "2rem"}}>{t("Reviews")}</span>
            </div>
            <div className="d-flex gap-3">
                <InputText
                    onInput={(e) =>
                        setFilters({
                            global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                        })
                    }
                    placeholder={t("Search")}
                />
                {isYour || isAdmin ?
                    <Button
                        label={
                            <span>
                                {t("Delete")} <IoTrashBinSharp style={{fontSize: "1.5rem"}}/>
                            </span>
                        }
                        severity="danger"
                        onClick={confirmDeleteSelected} disabled={!selectedReviews || !selectedReviews.length}
                    />
                    :
                    <></>}
            </div>
        </Container>
    );
};

export default TableHeader;