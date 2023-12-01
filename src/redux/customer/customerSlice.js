import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingCustomer:null,
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    edit_Customer:(state, action)=>{
      state.editingCustomer=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { edit_Customer } = customerSlice.actions;

export default customerSlice.reducer; 