import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainReducer, { productReducer } from './slices/main';
import drawerReducer from './slices/drawer/index';
import { initCartDrawerState } from './slices/drawer/init';
import usrSlice from './slices/user/userSlice';
import usersSlice from './slices/Admin/AdminsSlice';
import { initMainState } from './slices/main/init';

const persistConfig = {
  key: 'root',
  storage,
   
  migrate: (state: any) => { //eslint-disable-line
    const { _persist = {} } = state || {};
    const main = { ...initMainState, ...(state?.main || {}) };
    // const products = { ...initProductState, ...(state?.products || {}) };
    const drawer =
      typeof state?.drawer === 'boolean' ? state.drawer : initCartDrawerState;
    return Promise.resolve({ _persist, main, drawer });
  },
};

const rootReducer = combineReducers({
  main: mainReducer,
  drawer: drawerReducer,
  products: productReducer,
  usrSlice: usrSlice,
  usersSlice: usersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
