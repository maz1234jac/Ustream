import { combineReducers } from "@reduxjs/toolkit";
import refreshReducer from "../slices/refreshSlice";
import userReducer from "../slices/profileSlice"

const rootReducer=combineReducers({
    refresh:refreshReducer,
    user:userReducer
})

export default rootReducer;