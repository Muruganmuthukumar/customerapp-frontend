import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingOrder:null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    edit_Order:(state, action)=>{
      state.editingOrder=action.payload;
    }
  },
})

export const { edit_Order } = orderSlice.actions;

export default orderSlice.reducer; 