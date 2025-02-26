import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '../store';
import { addItem, removeItem, updateItemQuantity } from '../slices/cart';
import { CartItem } from '../slices/cart/types';

export const useCart = () => {
  const dispatch = useDispatch<Dispatch>();
  const cartItems = useSelector((state: State) => state.cart.items);

  const addItemToCart = (item: CartItem) => dispatch(addItem(item));
  const removeItemFromCart = (item: CartItem) => dispatch(removeItem(item));
  const updateItemInCart = (id: number, quantity: number) =>
    dispatch(updateItemQuantity({ id, quantity }));

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemInCart,
  };
};
