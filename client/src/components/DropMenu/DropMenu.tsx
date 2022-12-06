import React, { useCallback, useState } from 'react';
import classes from "./DropMenu.module.scss";
import { getClassesWithModifires } from "../../helpers/getClassesWithModifires";

export interface  IDropMenu {
    children: React.ReactNode[] | JSX.Element[] | React.ReactNode;
    textToggle:string;
}
export interface IDropMenuItem {
    onClick: (event?:React.MouseEvent) => void;
    children:string;
 }
export const DropMenuItem = ({ onClick, children}:IDropMenuItem) => {
    return (
        <div
            onClick = { onClick }
            className ={ getClassesWithModifires(classes,"drop-menu", "item") }
        >
             { children }
        </div>
   );
}
export const DropMenu = ({ children, textToggle }:IDropMenu) => {
    let  [showList, setShowList] = useState(false);
    let onMouseEnterHandler = useCallback(() => {
          setShowList(true);
    },[]);
    let onMouseLeaveHandler = useCallback(() => {
          setShowList(false);
    },[]);
    return (
            <div
                className={ getClassesWithModifires(classes,"drop-menu")}
                onMouseEnter={ onMouseEnterHandler }
                onMouseLeave={ onMouseLeaveHandler }
            >
                {
                    <div className={getClassesWithModifires(classes,"drop-menu","inner") }
                     >
                       { textToggle }
                        {
                            showList &&
                            <div className={ getClassesWithModifires(classes, "drop-menu", "list") } >
                                {   children}
                            </div>
                        }
                    </div>
                }
            </div>
    );
};
