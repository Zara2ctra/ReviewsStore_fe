import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes.js";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Alert404 from "./404";

const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth === false && publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAdmin === true && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route
                key={"404"}
                path="*"
                element={<Alert404/>}
                exact
            />
        </Routes>
    );
});

export default AppRouter;