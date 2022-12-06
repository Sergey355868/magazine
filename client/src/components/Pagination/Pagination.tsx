import React from 'react';
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import classes from "./Pagination.module.scss";

interface IPaginationItem {
    children:string | number;
    active:boolean;
    onClick?: () => void;
}
interface  IPagination {
    children:JSX.Element[] | JSX.Element | React.ReactNode | React.ReactNode[];
}
export const PaginationItem = ({ children, active, onClick}:IPaginationItem) => {
    return (
        <span
          className= {
            active ? getClassesWithModifires(classes,"pagination","item")
            : getClassesWithModifires(classes,"pagination","item",[],["active"])
        }
        onClick={ onClick }
        >
          { children }
        </span>
    );
}
export const Pagination = ({children}:IPagination) => {
    return (
        <div className={getClassesWithModifires(classes,"pagination")}>
            { children }
        </div>
    );
};

