import { AppDispatch } from "../store";
import {urlRegistration, urlCheck, urlLogin} from "./index";
import {userFulfilled, userPending, userRegected} from "../store/Reducers/userReducer";
import jwt_decode from "jwt-decode";
import React from "react";

export const login = (email:string, password:string) => async (dispatch:AppDispatch) => {
    try {
        dispatch(userPending());
        setTimeout(async () => {
            let  response = await fetch(urlLogin,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                   email,
                   password
                }),
            });
            if(response.ok) {
                    let data:{ token:string } =  await response.json();
                    //console.log(data);
                    localStorage.setItem("token",data.token);
                    dispatch(userFulfilled(jwt_decode(data.token)));
            } else {
                    let err:{ message:string } = await response.json();
                    console.log("Ошибка HTTP" + response.status);
                    dispatch(userRegected(err.message));
           }
        },3000);
        //console.log(response);
    } catch (e) {
        dispatch( userRegected("Ошибка при логине"));
    }
};
export const registration = (email:string, password:string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userPending());
        setTimeout(async () => {
            let  response = await fetch(urlRegistration,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
               },
                body: JSON.stringify({
                    email,
                    password,
                    role: 'ADMIN'
                }),
            });
            if(response.ok) {
                let data:{ token:string } =  await response.json();
                //console.log(data);
                localStorage.setItem("token",data.token);
                dispatch(userFulfilled(jwt_decode(data.token)));
            } else {
                let err:{ message:string } = await response.json();
                dispatch(userRegected(err.message));
            }
        },3000);
    } catch (e) {
        dispatch( userRegected("Ошибка при регистраци"));
    }
}
export const  check =(
    setIsLoader:React.Dispatch<React.SetStateAction<boolean>>,
    setIsError: React.Dispatch<React.SetStateAction<string>>) => async (dispatch:AppDispatch) =>
    {
         try {
                 let response = await fetch(urlCheck,{
                    method:"GET",
                    headers: {
                        authorization: `Bearer ${ localStorage.getItem('token') }`,
                    }
                });
                if(response.ok) {
                    setIsLoader(false);
                    let data:{ token:string } =  await response.json();
                    localStorage.setItem("token",data.token);
                    dispatch(userFulfilled(jwt_decode(data.token)));
                } else  {
                     setIsLoader(false);
                     let error:{ message:string } = await response.json();
                     console.log(error.message);
                     dispatch(userRegected(error.message));
                }
        } catch (e) {
            setIsLoader(false);
            setIsError("Что-то пошло не так,перезагрузите страницу");
        }
   }