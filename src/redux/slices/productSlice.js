import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchProduct = createAsyncThunk(
  'pizzas/fetchProductStatus',
  async (params, thunkAPI) => {
    const { category, order, sortBy, search, curentPage } = params;
    const { data } = await axios.get(
      `https://64a94ae08b9afaf4844a81d6.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    console.log(thunkAPI.getState());
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
      state.status = 'loading';
      console.log('loading')
      state.items = [];
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
    },
    [fetchProduct.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectProduct = state => state.product

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
