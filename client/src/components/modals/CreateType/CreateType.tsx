import React, {useCallback, useEffect, useState} from 'react';
import { ICreateBrand } from "../modal.interface";
import  { OverLay } from "../../OverLay/OverLay";
import { getClassesWithModifires } from "../../../helpers/getClassesWithModifires";
import  classes from "./CreateType.module.scss";
import { Button } from "../../Button/Button";
import {createType} from "../../../http/TypeAPI";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {Loader} from "../../Loader/Loader";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {BoxSuccess} from "../../BoxSuccess/BoxSuccess";
import {setTypeError, setTypeEmpty} from "../../../store/Reducers/typeReducer";
import {BoxError} from "../../BoxError/BoxError";

export const CreateType = ({ show = false , onHide }:ICreateBrand) => {
    let [type,setType] = useState("");
    const dispatch = useAppDispatch();
    let { type:{ isLoading,error,type:{ name} }} = useTypedSelector(state => state);
    let chageHandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    },[]);
    let clickHandler = useCallback(() => {
         if(type.length > 3) {
             dispatch(createType({ name: type }));
             setType("");
         }
    },[type]);
    useEffect(() => {
      const anHandler = (event:AnimationEvent) => {
          if(event.animationName.startsWith( "BoxSuccess_hidden")) {
              dispatch(setTypeEmpty());
          }
          if(event.animationName.startsWith("BoxError_hidden")) {
              dispatch(setTypeError(""));
          }
      }
      document.addEventListener("animationend",anHandler);
      return () =>  {
         document.removeEventListener("animationend",anHandler);
      };
    },[]);
    return show
        ? (
            <>
                <OverLay animate={ true }></OverLay>
                <div
                   className= { getClassesWithModifires(classes,"createType") }
                >
                    <div className="createType__header">
                        <h2 className={getClassesWithModifires(classes,"createType","title") }>Добавить тип</h2>
                    </div>
                    <div className={getClassesWithModifires(classes,"createType","body")}>
                        { isLoading ? <Loader pos="abs"/> : null }
                        { name ? <BoxSuccess message={`Тип ${ name } добавлен`} animate="suc"/>
                         : null}
                        { error ? <BoxError message={error} pos={"abs2"} animate={true}/> : null }
                        <input
                            value={ type }
                            className={ getClassesWithModifires(classes,"createType","input") }
                            placeholder="Введите тип"
                            onChange={ chageHandler }
                        />
                    </div>
                    <div className={ getClassesWithModifires(classes,"createType","footer") }>

                        <Button
                            theme="2"
                            className={getClassesWithModifires(classes,"createType","button")}
                            onClick={ clickHandler }
                            disabled={ isLoading }
                        > Добавить
                        </Button>
                        <Button
                            theme="2"
                            className={getClassesWithModifires(classes,"createType","button")}
                            onClick={ onHide }
                        > Закрыть </Button>
                    </div>
                </div>
            </>
        )
        : null;
};

