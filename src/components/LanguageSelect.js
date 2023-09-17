import React, {useContext} from 'react';
import {LANG} from "../utils/consts";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {Context} from "../index";

const LanguageSelect = () => {
    const { t, i18n } = useTranslation();
    const {user} = useContext(Context);
    let themeMode = user.themeMode;

    const handleChangeType = async (e) => {
        const currentLang = e.target.value.toLowerCase().slice(0,2)
        await i18n.changeLanguage(currentLang);
        localStorage.setItem('lang', currentLang)
    }

    return (
        <Form.Select
            onChange={handleChangeType}
            className={"ms-2"}
            data-bs-theme={themeMode}
            required
        >
            <option disabled selected hidden>
                {t('Choose the language')}
            </option>
            {LANG.map((lang) => {
                return (
                    <option key={lang}>{lang}</option>
                )
            })}
        </Form.Select>
    );
};

export default LanguageSelect;