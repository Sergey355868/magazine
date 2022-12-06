import React, { FC, useCallback } from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../routes/routesPathes";
import {Button } from "../Button/Button";
import { IUser, setIsAuth, setUser } from "../../store/Reducers/userReducer";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getClassesByNumber } from "../../helpers/__classes";
import classes from "./NavBar.module.scss";

export  const NavBar:FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let{ user:{ isAuth } } = useTypedSelector((state) => state);
    console.log(isAuth);
    let clickAdminRoute = useCallback( () => {
        navigate(ADMIN_ROUTE);
    },[navigate]);
    let clickLoginRoute = useCallback(() => {
       navigate(LOGIN_ROUTE);
    },[navigate]);
    let clickLogout = useCallback(() => {
            dispatch(setIsAuth(false));
            dispatch(setUser({} as IUser ));
    },[dispatch]);

    return (
        <>
            <nav
            className = {
                getClassesByNumber(classes,"b1",["br1","th1"])
                + " " + classes["root__navigate"]
            }
            >
                <div
                 className={getClassesByNumber(classes,"el1",["al1","hv1"])}
                >
                    <NavLink
                        to={ SHOP_ROUTE }
                        className={ getClassesByNumber(classes,"el2",["st1"])}
                    >ДевайсShop</NavLink>
                </div>

                { isAuth ?(
                        <div
                            className={getClassesByNumber(classes,"el1",["al1","pdr1","mr1"])}
                        >
                            <Button
                                text="Админ панель"
                                onClick={ clickAdminRoute }
                            />
                            <Button
                                text= "Выйти"
                                onClick={ clickLogout }
                            />
                        </div>)
                        :
                    ( <div className={getClassesByNumber(classes,"el1",["al1","pdr1","mr1"])}>
                             <Button
                               onClick={clickLoginRoute}
                             >Авторизация</Button>
                   </div>)
                }
            </nav>
        </>
    );
};

