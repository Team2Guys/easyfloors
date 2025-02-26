/* eslint-disable */
'use client';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { MainState } from '@mainSlice/types';
import { State } from 'redux/store';
type UseMainSlice = <T = unknown>(selector: (state: MainState) => T) => T;

const main = (state: State) => state.main;

export const useMainSlice: UseMainSlice = (selector) =>
  useSelector(createSelector(main, selector));
/* eslint-enable */
