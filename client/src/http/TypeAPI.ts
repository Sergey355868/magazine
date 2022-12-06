import { AppDispatch } from "../store";
import { urlType } from "./index";
import {createTypeFulfilled, getTypesFulfilled, IType, typePending, typeRegected} from "../store/Reducers/typeReducer";

export const createType =(type:{ name:string }) => async(dispatch:AppDispatch) => {
    dispatch(typePending());
    setTimeout(async () => {
        try {
            let response = await fetch(urlType,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                     authorization: `Bearer ${ localStorage.getItem('token') }`,
                },
                body :JSON.stringify(type),
            });
            if(response.ok) {
                let createdType:{ id:number, name:string }  = await response.json();
                dispatch(createTypeFulfilled(createdType));
            } else {
                let error:{ message:string } = await response.json();
                 dispatch(typeRegected(error.message));
            }
        } catch (e) {
           dispatch(typeRegected("Непредвиденная ошибка"));
        }
    },3000);
};
export const getAllTypes = () => async (dispatch:AppDispatch) => {
    dispatch(typePending());
    setTimeout(async () => {
        try {
            let response =  await fetch(urlType);
            if(response.ok) {
                let allTypes:IType[] = await response.json();
                dispatch(getTypesFulfilled(allTypes));
            } else {
                let error:{ message:string } = await response.json();
                console.log(error.message);
                dispatch(typeRegected(error.message));
            }
        } catch (e) {
            dispatch(typeRegected("Непредвиденная ошибка"));
        }
    },3000);


}
