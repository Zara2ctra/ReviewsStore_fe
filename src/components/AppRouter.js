import React, {useContext} from 'react';
import { Navigate, Routes, Route} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes.js";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component()} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component()} exact/>
            )}
            {user.isAdmin === true && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component()} exact/>
            )}
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );
});

export default AppRouter;