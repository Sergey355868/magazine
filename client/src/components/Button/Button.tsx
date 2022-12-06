import React from 'react';
import classes from "./Button.module.scss";
import { __classes, getClassesByNumber } from "../../helpers/__classes";

interface IButton {
    text?: string;
    className?: string;
    onClick?:(event?:React.MouseEvent) => void
    children?:string | React.ReactNode;
    theme?:string;
    disabled?:boolean;
}
export const Button = ({className = "",text = "", theme = "", onClick, children,disabled = false,  }:IButton) => {
    return (
        <button
         className ={ __classes(
             !theme ? getClassesByNumber(classes,"b1",["br1","st1","th1","hv1"]):
                 getClassesByNumber(classes,"b1",["br1","st1","th2","hv1"]),
             className,
             ) }
         onClick={ onClick }
         disabled={ disabled}
         >
            { (children && !text) && children }
            { (text && !children) && text }
        </button>
    );
};

