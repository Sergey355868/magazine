import  { AppDispatch } from "../store";
import {createDeviceURL, deviceURLWithSerchPar} from "./index";
import {
    createDeviceFulfilled,
    devicePending,
    deviceRegected,
    getDeviceFulfilled,
    IDevice, Iinfo, setTotalCount
} from "../store/Reducers/deviceReducer";
import {typeRegected} from "../store/Reducers/typeReducer";

interface IGetDevice {
    typeId?:number ;
    brandId?:number;
    page:number;
    limit:number;
}
interface IIndexer{
    [key:string]:number;
}

export const createDevice = (formData:FormData) => async (dispatch:AppDispatch) => {
    dispatch(devicePending());
    setTimeout(async () => {
        try {
            let response = await fetch(createDeviceURL, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });
            if (response.ok) {
                let device:IDevice<Iinfo> = await  response.json();
                console.log(device);
                dispatch(createDeviceFulfilled(device));
            } else {
                let error:{message:string} = await  response.json();
                dispatch(deviceRegected(error.message || "Непредвиденная ошибка"));
                console.log(error);
            }
        } catch(e) {
            dispatch(typeRegected("Что-то пошло не так....."));
        }
    },3000);
}
export const getOneDevice = (id:string) => async(dispatch:AppDispatch) => {
     dispatch(devicePending());
     setTimeout(async () => {
         try {
             let response =  await  fetch(createDeviceURL.toString + "/" + id);
             if(response.ok) {
                 const device = await response.json();
                 dispatch(createDeviceFulfilled(device));
             } else {
                let error:{message:string } = await  response.json();
                dispatch(deviceRegected(error.message));
             }
         } catch (e) {
             dispatch(typeRegected("Что-то пошло не так....."));
         }
     },3000);
}
export const getDevices = (obj:IGetDevice & IIndexer) => (dispatch:AppDispatch) => {
    let entries = Object.entries<number>(obj);
    for(let [key,value] of entries) {

        if(value) {
            deviceURLWithSerchPar.searchParams.set(key,String(value));
        }
    }
    dispatch(devicePending());
    setTimeout(async () => {
        try {
            let response = await fetch(deviceURLWithSerchPar);
            if(response.ok) {
                const devices:{count:number,rows:IDevice<Iinfo>[]} = await response.json();
                console.log ("DEVICES", devices);
                dispatch(setTotalCount(devices.count));
                dispatch(getDeviceFulfilled(devices.rows));
            } else {
                let error:{message:string } = await  response.json();
                dispatch(deviceRegected(error.message));
            }
        }catch (e) {
            dispatch(typeRegected("Что-то пошло не так....."));
        }
    },3000);
};