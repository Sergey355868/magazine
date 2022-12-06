import React, {useEffect} from 'react';
import { TypeBar } from "../components/TypeBar/TypeBar";
import { BrandBar } from "../components/BrandBar/BrandBar";
import { DeviceList } from "../components/DeviceList/DeviceList";
import {NumberPages} from "../components/NumberPages/NumberPages";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {getAllTypes} from "../http/TypeAPI";
import {getAllBrands} from "../http/BrandAPI";
import {getDevices} from "../http/DeviceAPI";
import {useTypedSelector} from "../hooks/useTypedSelector";

export const Shop = () => {
    const dispatch = useAppDispatch();
    let { device:{ activePage },brand:{ selectedBrand },type:{ selectedType } } = useTypedSelector(state => state);
    useEffect(() => {
        dispatch(getAllTypes());
        dispatch(getAllBrands());
        // dispatch(getDevices({
        //     page:1,
        //     limit:2,
        // }));
    },[]);
    useEffect(() => {
        dispatch((getDevices({
           page:activePage,
           limit:2,
           brandId:selectedBrand.id,
           typeId: selectedType.id,
        })));
    },[activePage,selectedBrand, selectedType]);
    return (
        <div className="contaner" style={{marginTop:"75px"}}>
            <div className="row" style={{minHeight:"calc(100vh - 75px)"}}>
                <div className="col col_size_30">
                    <TypeBar/>
                </div>
                <div className="col col_size_70">
                       <BrandBar/>
                    <div className="row row_center ">
                        <DeviceList/>
                    </div>
                    <NumberPages/>
                </div>
            </div>
        </div>
    );
};

