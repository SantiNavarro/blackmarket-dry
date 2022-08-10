import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import productsReducer from './slices/productsSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
