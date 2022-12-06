import React from 'react';
import classes from "./BoxError.module.scss";
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
interface IBoxError {
  message: string;
  pos    : "abs1"| "abs2"|"abs3" | "abs4" | "fix";
  animate?:boolean;
}
export const BoxError = ({ message, pos, animate =false }:IBoxError) => {
    return (
        <div className={ pos.includes("abs") ?
          getClassesWithModifires(classes,"box-error","",[`ps_${ pos }`,`${ animate?"animate": ""}`]):
          getClassesWithModifires(classes ,"box-error","",[`ps_${ pos }`,`${ animate?"animate": ""}`])}>
          { message + ". " + "Поробуйте снова." }
        </div>
    );
};

