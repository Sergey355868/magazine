import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface  IType {
   id:number;
   name:string;
}
interface ITypeState<T> {
   isLoading:boolean;
   allTypes:T[];
   type:T,
   selectedType:T,
   error:string;
}
const initialState:ITypeState<IType>  = {
   isLoading: false,
   allTypes:[],
   type:{} as IType,
   selectedType: {} as IType,
   error: "",
}
const typeSlice = createSlice({
   name:"type",
   initialState,
   reducers: {
       typePending: (state) => {
        state.isLoading = true;
      },
      createTypeFulfilled: (state, action:PayloadAction<IType>) =>{
        state.isLoading = false;
        state.error = "";
        state.type = action.payload;
      },
      getTypesFulfilled:(state, action:PayloadAction<IType[]>) => {
        state.isLoading = false;
        state.error ="";
        state.allTypes = action.payload;
      },
      typeRegected:(state, action:PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      setTypeEmpty:(state) => {
          state.type = {} as IType;
      },
      setTypeError:(state,action:PayloadAction<string>) => {
        state.error = action.payload;
      },
      setSelectedType:(state, action:PayloadAction<IType>) =>{
           state.selectedType = action.payload;
      }
   }
});
export const {reducer:typeReducer, actions:typeActions} = typeSlice;
export const {typePending,createTypeFulfilled,getTypesFulfilled,typeRegected,setTypeEmpty,
setTypeError, setSelectedType } = typeSlice.actions;