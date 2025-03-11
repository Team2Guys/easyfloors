import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initMainState, initProductState } from './init';
import { IProduct } from 'types/prod';

const MainSlice = createSlice({
  name: 'main',
  initialState: initMainState,
  reducers: {
    setDummy: (state, action: PayloadAction<string>) => {
      state.dummy = action.payload;
    },
  },
});

const ProductSlice = createSlice({
  name: 'product',
  initialState: initProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setDummy } = MainSlice.actions;
export const { setProducts } = ProductSlice.actions;

export default MainSlice.reducer;
export const productReducer = ProductSlice.reducer;
