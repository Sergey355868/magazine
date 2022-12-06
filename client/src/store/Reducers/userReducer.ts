import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface IUser {
    id:number;
    email:string;
    password:string;
    role:string;
}
 interface IUserState<T> {
    error:string;
    isLoading:boolean;
    isAuth:boolean;
    user:T;
}
const initialState:IUserState<IUser> = {
    error:"",
    isLoading:false,
    isAuth:false,
    user:{} as IUser
};
 const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth:(state, { payload }:PayloadAction<boolean>) => {
            state.isAuth = payload;
        },
        setUser: (state,{ payload }:PayloadAction<IUser>) => {
            state.user = payload;
        },
        setError:(state,{ payload }:PayloadAction<string>) => {
            state.error = payload;
        },
        userPending:(state) => {
            state.error = "";
            state.isLoading  = true;
        },
        userFulfilled:(state,{ payload }:PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = "";
            state.user = payload;
            state.isAuth = true;
        },
        userRegected:(state, { payload }:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
    }
});
export const { actions:userActions, reducer:userReducer  }  = userSlice;
export const { setIsAuth, setUser,userRegected,userPending,userFulfilled, setError }  = userSlice.actions;


