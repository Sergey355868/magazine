import React from 'react';
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import classes from "./InputFile.module.scss";
interface InputFile {
    onChange?:(event:React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = ({ onChange }:InputFile) => {
    return (
        <div className={ getClassesWithModifires(classes,"custom-input-file")}>
            <label className = { getClassesWithModifires(
                classes,"custom-input-file","label")
            }
            >
                  Нажмите для загрузки.
                 <input
                     type="file"
                     className={
                         getClassesWithModifires(classes, "custom-input-file", "input")
                     }
                     onChange = { onChange }
                 />
            </label>
        </div>
    );
};

