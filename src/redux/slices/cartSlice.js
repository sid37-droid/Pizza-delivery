import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    cart:{

    },
    totalPrice: 0
}
export const cart = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalPrice: (state, action)=>{
            
        }
    }
})