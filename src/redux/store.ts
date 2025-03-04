import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mainReducer from './slices/main';
// import usrSlice from './slices/user/userSlice';
import usersSlice from './slices/Admin/AdminsSlice';



const rootReducer = combineReducers({
  main: mainReducer,
    // usrSlice: usrSlice,
  usersSlice: usersSlice,
});



export const store = configureStore({
  reducer: rootReducer,
 
});



export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
