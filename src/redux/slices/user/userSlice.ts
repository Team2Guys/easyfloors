import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  userLoading: boolean;
  loggedInUser: any | undefined;
} = {
  userLoading: false,
  loggedInUser: undefined,
};

const usrSlice = createSlice({
  name: 'usrSlice',
  initialState: initialState,
  reducers: {
    loggedInUserAction: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { loggedInUserAction } = usrSlice.actions;
export default usrSlice.reducer;
