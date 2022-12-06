import { AppDispatch } from "../store";
import { urlBrand } from "./index";
import {
    brandPending,
    brandRegected,
    createBrandFulfilled,
    getBrandsFulfilled,
    IBrand
} from "../store/Reducers/brandReducer";

export const createBrand =(brand:{ name:string }) => async(dispatch:AppDispatch) => {
    dispatch(brandPending());
    setTimeout(async () => {
        try {
            let response = await fetch(urlBrand,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: `Bearer ${ localStorage.getItem('token') }`,
                },
                body :JSON.stringify(brand),
            });
            if(response.ok) {
                let createdBrand:{ id:number, name:string }  = await response.json();
                dispatch(createBrandFulfilled(createdBrand));
            } else {
                let error:{ message:string } = await response.json();
                dispatch(brandRegected(error.message));
            }
        } catch (e) {
            dispatch(brandRegected("Непредвиденная ошибка"));
        }
    },3000);
};
export const getAllBrands = () => async (dispatch:AppDispatch) => {
    dispatch(brandPending());
    setTimeout(async () => {
        try {
            let response =  await fetch(urlBrand);
            if(response.ok) {
                let allBrands:IBrand[] = await response.json();
                dispatch(getBrandsFulfilled(allBrands));
            } else {
                let error:{ message:string } = await response.json();
                console.log(error.message);
                dispatch(brandRegected(error.message));
            }
        } catch (e) {
            dispatch(brandRegected("Непредвиденная ошибка"));
        }
    },5000);
 }