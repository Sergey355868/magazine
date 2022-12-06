import React, {useCallback, useEffect, useState} from 'react';
import { ICreateBrand } from "../modal.interface";
import { Button } from "../../Button/Button";
import classes from "./CreateBrand.module.scss";
import {getClassesWithModifires} from "../../../helpers/getClassesWithModifires";
import {OverLay} from "../../OverLay/OverLay";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {setBrandEmpty, setBrandError} from "../../../store/Reducers/brandReducer";
import {Loader} from "../../Loader/Loader";
import {BoxSuccess} from "../../BoxSuccess/BoxSuccess";
import {BoxError} from "../../BoxError/BoxError";
import {createBrand} from "../../../http/BrandAPI";

export const CreateBrand = ({ show = false , onHide }:ICreateBrand) => {
    let [brand,setBrand] = useState("");
    const dispatch = useAppDispatch();
    let{ brand:{ isLoading,error,brand:{ name } } } =useTypedSelector(state => state);

    let chageHandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
         setBrand(event.target.value);
    },[]);
     let clickHandler = useCallback(() => {
         if(brand.length > 1) {
             dispatch(createBrand({ name: brand }));
             setBrand("");
         }
     },[brand]);
     useEffect(() => {
         const anHandler = (event:AnimationEvent) => {
             if(event.animationName.startsWith( "BoxSuccess_hidden")) {
                 dispatch(setBrandEmpty());
             }
             if(event.animationName.startsWith("BoxError_hidden")) {
                 dispatch(setBrandError(""));
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
                   className= { getClassesWithModifires(classes,"createBrand") }
                >
                    <div className="createBrand__header">
                      <h2
                        className={getClassesWithModifires(classes,"createBrand","title")}
                      >Добавить бренд</h2>
                    </div>
                    <div className={getClassesWithModifires(classes,"createBrand","body")}>
                        { isLoading ? <Loader pos="abs"/> : null }
                        { name ? <BoxSuccess message={`Бренд ${ name } добавлен`} animate="suc"/>
                            : null}
                        { error ? <BoxError message={error} pos={"abs2"} animate={true}/> : null }
                        <input
                            value={ brand }
                            className={ getClassesWithModifires(classes,"createBrand","input") }
                            placeholder="Введите бренд"
                            onChange={ chageHandler }
                        />
                    </div>
                    <div className={ getClassesWithModifires(classes,"createBrand","footer") }>

                        <Button
                            theme="2"
                            className={getClassesWithModifires(classes,"createBrand","button")}
                            onClick={ clickHandler }
                            disabled={ isLoading }
                        > Добавить</Button>
                        <Button
                            theme="2"
                            className={getClassesWithModifires(classes,"createBrand","button")}
                            onClick={ onHide }
                        > Закрыть </Button>
                    </div>
                </div>
            </>
    )
    : null;
};

