import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:null,
  listType:"",
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    list:(state, action)=>{
        state.list=action.payload;
    },
    listType:(state, action)=>{
        state.listType=action.payload
    }
  },
})

export const { list, listType } = listSlice.actions;

export default listSlice.reducer;