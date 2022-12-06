import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface  IBrand {
    id:number;
    name:string;
}
interface IBrandState<T> {
    isLoading:boolean;
    error:string;
    brand:T;
    brands:T[];
    selectedBrand:T
}
const initialState:IBrandState<IBrand>  = {
    isLoading: false,
    error:"",
    brands:[],
    brand: {} as IBrand,
    selectedBrand: {} as IBrand
}
const brandSlice = createSlice({
    name:"brand",
    initialState,
    reducers: {
        brandPending: (state) => {
            state.isLoading = true;
        },
        createBrandFulfilled: (state, action:PayloadAction<IBrand>) =>{
            state.isLoading = false;
            state.error = "";
            state.brand = action.payload;
        },
        getBrandsFulfilled:(state, action:PayloadAction<IBrand[]>) => {
            state.isLoading = false;
            state.error ="";
            state.brands = action.payload;
        },
        brandRegected:(state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setBrandEmpty:(state) => {
            state.brand = {} as IBrand;
        },
        setBrandError:(state,action:PayloadAction<string>) => {
            state.error = action.payload;
        },
        setSelectedBrand:(state, action:PayloadAction<IBrand>) =>{
            state.selectedBrand = action.payload;
        }
    }
});
export const {reducer:brandReducer, actions:brandActions} = brandSlice;
export const { brandPending,createBrandFulfilled,getBrandsFulfilled,brandRegected,
setBrandEmpty,setBrandError, setSelectedBrand } = brandSlice.actions;