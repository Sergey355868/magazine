import React, {useCallback, useState } from 'react';
import {Button} from "../components/Button/Button";
import { CreateBrand } from "../components/modals/CreateBrand/CreateBrand";
import {CreateDevice} from "../components/modals/CreateDevice/createDevice";
import {CreateType} from "../components/modals/CreateType/CreateType";

export const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    let clickBrandHandler = useCallback(() => {
        setBrandVisible(true);
    },[]);
    let clickTypeHandler = useCallback(() => {
        setTypeVisible(true);
    },[]);
    let clickDeviceHandler = useCallback(() => {
        setDeviceVisible(true);
    },[]);
    let handlerBrandOnHide = useCallback(() => {
        setBrandVisible(false);
    },[]);
    let handlerTypeOnHide = useCallback(() => {
        setTypeVisible(false);
    },[]);
    let handlerDeviceOnHide = useCallback(() => {
        setDeviceVisible(false);
    },[]);
       return (
        <div className= "col" style={{marginTop: "65px", minHeight:"calc(100vh - 65px)"}}>
                <Button
                    className="col__button col__button__style col__button_size"
                    onClick={ clickTypeHandler }
                >
                    Добавить тип
                </Button>

               <Button
                   className="col__button col__button__style col__button_size"
                   onClick={ clickBrandHandler }
               >
                   Добавить бренд
               </Button>

               <Button
                   className="col__button col__button__style col__button_size"
                   onClick={ clickDeviceHandler }
               >
                   Добавить устройство
               </Button>
            { brandVisible && <CreateBrand show={ brandVisible } onHide={handlerBrandOnHide}/> }
            { deviceVisible && <CreateDevice show={ deviceVisible } onHide={handlerDeviceOnHide}/> }
            { typeVisible && <CreateType show={ typeVisible } onHide={ handlerTypeOnHide }/> }
       </div>

    );
};

