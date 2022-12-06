import React from 'react';
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import classes from "./BoxSuccess.module.scss";
interface IBoxSuccess {
  message?:string;
  pos?: "abs" | "rel";
  animate?:"suc" | "hid";
  shift?:"shift_1" | "shift_2"
}
export const BoxSuccess = ({ message = "",pos ="abs",animate = "suc",shift= "shift_1"}:IBoxSuccess) => {
    return (
        <div className={
            animate  === "suc"
                ? getClassesWithModifires(classes,"box-success","",["animation_vis",`${shift}`])
                : getClassesWithModifires(classes,"box-success","",["animation_hid",`${shift}`])}
        >
            { message }
        </div>
    );
};

