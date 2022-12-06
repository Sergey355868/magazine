import React from 'react';
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import classes from "./OverLay.module.scss";
export interface IOverLay {
    animate?:boolean;
}

 export const OverLay = ({animate = false}: IOverLay) => {
    return (
        <div className={
            animate
            ?  getClassesWithModifires(classes,"overlay")
            :  getClassesWithModifires(classes,"overlay","",[],["animate"])
        }
        ></div>
    );
};

