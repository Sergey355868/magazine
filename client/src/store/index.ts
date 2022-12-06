import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {userActions, userReducer} from "./Reducers/userReducer";
import {typeActions, typeReducer} from "./Reducers/typeReducer";
import {brandActions, brandReducer} from "./Reducers/brandReducer";
import {deviceActions, deviceReducer} from "./Reducers/deviceReducer";

export const allActions = {
    ...userActions,
    ...typeActions,
    ...brandActions,
    ...deviceActions,
};

const rootReducer = combineReducers({
    user:userReducer,
    type:typeReducer,
    brand:brandReducer,
    device:deviceReducer,
});

export const store  = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;