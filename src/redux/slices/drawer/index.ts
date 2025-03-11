// drawerSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { CartDrawer } from './types';

const initialState: CartDrawer = false;

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: () => true,
    closeDrawer: () => false,
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
