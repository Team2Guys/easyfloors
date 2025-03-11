import { useDispatch } from 'react-redux';
import { Dispatch } from '../store';
import { closeDrawer, openDrawer } from '../slices/drawer';

export const useDrawer = () => {
  const dispatch = useDispatch<Dispatch>();

  const setOpenDrawer = () => dispatch(openDrawer());
  const setCloseDrawer = () => dispatch(closeDrawer());

  return {
    setOpenDrawer,
    setCloseDrawer,
  };
};
