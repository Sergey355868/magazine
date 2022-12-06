import React, {useMemo} from 'react';
import classes from "./Loader.module.scss";
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
interface ILoader {
    pos?: "fix"|"abs" | "rel" | "st";
    border?: "white" | "blue" | "black";
}
export const Loader = ({ pos="fix", border = "white" }:ILoader) => {
    let _classes = useMemo(() => {
        let _classes;
        if(pos ==="fix") {
            _classes = getClassesWithModifires(classes,"lds-ripple","",["pos_fix","shift_center"]);
        } else if(pos === "abs") {
            _classes = getClassesWithModifires(classes,"lds-ripple","",["pos_abs","shift_outcenter"]);
        } else if( pos === "rel") {
            _classes = getClassesWithModifires(classes,"lds-ripple","",["pos_rel"],["shift_center"]);
        } else if(pos === "st") {
            _classes = getClassesWithModifires(classes,"lds-ripple","",["pos_rel"],['shift']);
        }
       return _classes;
    },[pos]);
    let _classes_div = useMemo( () => {
        let classes_div;
        if(border ==="white") {
           classes_div = getClassesWithModifires(classes,"lds-ripple","div",["border_white"]);
        } else if( border ==="blue") {
            classes_div = getClassesWithModifires(classes,"lds-ripple","div",["border_blue"]);
        } else if(border === "black") {
          classes_div = getClassesWithModifires(classes,"lds-ripple","div",["border_black"]);
        }
        return classes_div;
    },[border]);
    return (
        <div className={ _classes }>
            <div className={ _classes_div }> </div>
            <div className={ _classes_div }> </div>
        </div>
    );
};
