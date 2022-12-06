import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Iinfo {
    id:number;
    title:string;
    description:string;
}
export interface IDevice<P> {
    id:number;
    name:string;
    price:number;
    img:string;
    brandId:number;
    typeId:number;
    rating?:number;
    info?:P[];
}
interface IDeviceState<T> {
    isLoading:boolean;
    device:T;
    error:string;
    allDevicies:T[];
    page:number;
    limit:number;
    totalCount:number;
    activePage:number;
}
const initialState:IDeviceState<IDevice<Iinfo>>  = {
    isLoading: false,
    device: {} as IDevice<Iinfo>,
    error:"",
    allDevicies:[],
    page:1,
    limit:2,
    totalCount:0,
    activePage:1,
}
const deviceSlice = createSlice({
    name:"device",
    initialState,
    reducers: {
        devicePending: (state) => {
            state.isLoading = true;
        },
        createDeviceFulfilled: (state, action:PayloadAction<IDevice<Iinfo>>) =>{
            state.isLoading = false;
            state.error = "";
            state.device = action.payload;
        },
        getDeviceFulfilled:(state, action:PayloadAction<IDevice<Iinfo>[]>) => {
            state.isLoading = false;
            state.error ="";
            state.allDevicies = action.payload;
        },
        deviceRegected:(state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setDeviceError:(state,action:PayloadAction<string>) => {
            state.error = action.payload;
        },
        setTotalCount:(state,action:PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        setDeviceEmpty:(state) => {
            state.device = {} as IDevice<Iinfo>;
        },
        setActivePage:(state,action:PayloadAction<number>) => {
            state.activePage = action.payload;
        },
    }
});
export const {reducer:deviceReducer, actions:deviceActions} = deviceSlice;
export const { devicePending,createDeviceFulfilled,getDeviceFulfilled,
deviceRegected,setDeviceError,setDeviceEmpty, setActivePage,setTotalCount } = deviceSlice.actions;