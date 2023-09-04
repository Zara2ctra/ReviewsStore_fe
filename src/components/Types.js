import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MAIN_ROUTE, TYPES_EN} from "../utils/consts";
import {Navbar} from "react-bootstrap";

const Types = observer(() => {
    const {user} = useContext(Context);
    const themeColors = user.themeColors;

    return (
        <Navbar
            style={{gap: "2em", justifyContent: "space-between"}}
        >
            {TYPES_EN.map((type) => {
                return (
                    <NavLink style={{color: themeColors.text}} to={MAIN_ROUTE}>{type}</NavLink>
                )
            })}
        </Navbar>
    );
})

export default Types;