import React from 'react';
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./Routes";
import {DevicePage, Shop} from "../pages";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const AppRouters = () => {
    let { user:{ isAuth } } = useTypedSelector(state => state);
    return (
        <Routes>
            {
                isAuth && authRoutes.map((authRoute,index) => {
                    return <Route key ={"routePrivate" + index  + "pr"} { ...authRoute}/>
                })
            }
            {
                publicRoutes.map ((publicroute,index) => {
                    return <Route key ={"routePublic" + index + "publ" } { ...publicroute } />
                })
            }
            <Route path = "*" element={ <Shop/> }/>
        </Routes>
    );
};

