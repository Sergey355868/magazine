import React from 'react';
import classes from "./BrandBar.module.scss";
import {getClassesWithModifires} from "../../helpers/getClassesWithModifires";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setSelectedBrand} from "../../store/Reducers/brandReducer";
import {Loader} from "../Loader/Loader";
import {useAppDispatch} from "../../hooks/useAppDispatch";

 export const BrandBar = () => {
     const dispatch = useAppDispatch();
    let {brand:{isLoading, brands,selectedBrand}} = useTypedSelector(state => state);
    if(isLoading) {
        return <Loader pos="st" border="blue"/>;
    }
    console.log(selectedBrand);
    return (
        <div className= {getClassesWithModifires(classes,"brand-list")}>
            {
                brands.map((brand) => {
                    return <div
                        className= { selectedBrand.id === brand.id
                            ? getClassesWithModifires(classes, "card")
                            : getClassesWithModifires(classes,"card","",[],["active"])}
                        key={ brand.id }
                        onClick={ () => dispatch(setSelectedBrand(brand)) }
                    >
                        { brand.name }
                    </div>;
                })
            }
        </div>
    );
};

