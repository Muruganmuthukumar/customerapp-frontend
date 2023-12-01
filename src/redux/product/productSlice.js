import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingProduct: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    edit_Product: (state, action) => {
      state.editingProduct = action.payload
    }
  },
})

export const { edit_Product } = productSlice.actions;

export default productSlice.reducer;