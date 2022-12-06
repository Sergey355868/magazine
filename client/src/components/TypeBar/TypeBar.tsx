import React from 'react';
import classes from "./TyperBar.module.scss";
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Loader} from "../Loader/Loader";
import { setSelectedType } from "../../store/Reducers/typeReducer";
import {useAppDispatch} from "../../hooks/useAppDispatch";

 export const TypeBar = () => {
     const dispatch = useAppDispatch();
     let { type:{ isLoading,allTypes,selectedType } } = useTypedSelector(state => state);
     if (isLoading) {
          return <Loader pos="st" border="blue"/>;
     }
    return (
        <ul className = { getClassesWithModifires(classes,"type-list") }
        >
            {
                allTypes.map((type) => {
                    return <li
                        key = { type.id }
                        onClick={ () => { dispatch(setSelectedType(type))} }
                        className ={
                        selectedType.id === type.id
                        ?  getClassesWithModifires(classes,"type-list","item")
                        :  getClassesWithModifires(classes,"type-list","item",[],["active"])
                    }
                    >{ type.name }</li>
                })
            }
        </ul>
    );
};

