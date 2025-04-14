import { createSlice } from "@reduxjs/toolkit";

export const routesSlice = createSlice({
    name: 'counter',
    initialState: {
      page: 'auth'
    },
    reducers: {
      navigate: (state, action)=>{
        state.page = action.payload
      }
    }
});