import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { appActions } from '../store/appSlice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({ ...appActions }, dispatch);
};
