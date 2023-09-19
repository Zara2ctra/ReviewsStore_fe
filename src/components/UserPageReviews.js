import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Context} from "../index";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Container} from "react-bootstrap";
import sohoDark from '../themes-soho-light.scss';
import sohoLight from '../themes-soho-light.scss'
import "primereact/resources/themes/soho-light/theme.css";
import "primereact/resources/themes/soho-dark/theme.css";
import {useTranslation} from "react-i18next";


const UserPageReviews = (themeMode, themeColor, reviewsData) => {
    const {t, i18n} = useTranslation();
    const [selectedThemeModule, setSelectedThemeModule] = useState(sohoDark);
    const [selectedState, setSelectedState] = useState(null);

    useLayoutEffect(() => {
        changeTheme(themeMode)
        selectedThemeModule.use();
        return () => { selectedThemeModule.unuse() };
    }, [themeMode])

    const changeTheme = (theme) => {
        import(`../themes-soho-${theme}.scss`).then((module) => {
            if (selectedThemeModule) {
                selectedThemeModule.unuse();
            }
            module.use();
            setSelectedThemeModule(module);
        });
    }



    return (
        <Container>
            <DataTable prefers-color-scheme={themeMode} value={reviewsData} tableStyle={{ minWidth: '50rem',}}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </Container>
    );
};

export default UserPageReviews;