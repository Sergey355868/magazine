import { Shop, Admin, Basket, Auth, DevicePage } from "../pages";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./routesPathes";
import { RouteProps } from "react-router-dom";

export const authRoutes:RouteProps[] = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>,
    },
    {
        path: BASKET_ROUTE,
        element: <Basket/>
    },
];
export const publicRoutes:RouteProps[] = [
    {
        path: SHOP_ROUTE,
        element: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth/>
    },
    {
        path: DEVICE_ROUTE + '/:id',
        element: <DevicePage/>
    },
];