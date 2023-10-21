import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlices = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItemId = state.items.find((obj) => obj.id === action.payload.id);
      if (findItemId) {
        findItemId.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
    },

    plusItem: (state, action) => {
      const findItemId = state.items.find((obj) => obj.id === action.payload);
      if (findItemId) {
        findItemId.count++;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.count * obj.price + sum;
        }, 0);
      }
    },

    minusItem: (state, action) => {
      const findItemId = state.items.find((obj) => obj.id === action.payload);
      if (findItemId && findItemId.count > 1) {
        findItemId.count--;
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.count * obj.price + sum;
        }, 0);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id != action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.count * obj.price + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0
    },
  },
});

export const selectCart = (state) => state.cart

export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlices.actions;

export default cartSlices.reducer;
