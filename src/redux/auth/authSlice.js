import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authentication: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuthenticated: (state, action) => {
            state.authentication = action.payload;
        },
    }
})
export const { isAuthenticated } = authSlice.actions;

export default authSlice.reducer;