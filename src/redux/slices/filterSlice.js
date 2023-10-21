import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  curentPage: 1,
  sort: {
    name: 'популярности(desc)',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryID: (state, action) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action) =>{
      state.searchValue = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurentPage: (state, action) => {
      state.curentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.curentPage = Number(action.payload.curentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state) => state.filter

export const { setCategoryID, setSort, setCurentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
