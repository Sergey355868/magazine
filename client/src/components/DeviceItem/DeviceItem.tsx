import React from 'react';
import star from "../../assets/star.png"
import telephone from "../../assets/telephone.jpg";
import { getClassesWithModifires } from "../../helpers/getClassesWithModifires";
import classes from "./DeviceItem.module.scss";
import { __classes } from "../../helpers/__classes";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../routes/routesPathes";
import {IDevice, Iinfo} from "../../store/Reducers/deviceReducer";
import {baseUrl} from "../../http";
interface  IDeviceItem {
    fake?:boolean;
    device:IDevice<Iinfo>;
}
export const  DeviceItem = ({ fake = false , device }:IDeviceItem) => {
    let navigate = useNavigate();
    return (
                <div
                    className = {
                    __classes(
                        fake ? getClassesWithModifires(classes,"device-card")
                        :getClassesWithModifires(classes,"device-card","",[],["fake"]),
                        classes["row__device-card"]
                    )
                }
                    onClick={() => navigate(DEVICE_ROUTE + "/" + device.id )}
                >
                    <div className ={getClassesWithModifires(classes,"device-card","img-device-contaner") }>
                      <img
                          alt="star"
                          className={ getClassesWithModifires(classes,"device-card","device-img") }
                          src={ baseUrl.toString() + device.img }
                      />
                    </div>
                    <div className={ getClassesWithModifires(classes,"device-card","description-contaner") }>
                      <span className="device-card__brand">Бренд</span>
                      <div className={ getClassesWithModifires(classes,"device-card", "rating-contaner") }>
                        <span className="device-card__rating-value"> {device.rating} </span>
                         <div className="device-card__star-contaner">
                             <img
                                 alt="star"
                                 className={ getClassesWithModifires(classes,"device-card","star") }
                                 src={star}
                             />
                         </div>
                      </div>
                      <span className= "device-card__name-device">{ device.name }</span>
                    </div>
               </div>


    );
};

