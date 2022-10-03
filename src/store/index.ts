import { configureStore } from '@reduxjs/toolkit';

import { searcherApi } from '../services/searcher';
import { appReducer } from './appSlice';

export const store = configureStore({
    reducer: {
        [searcherApi.reducerPath]: searcherApi.reducer,
        app: appReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(searcherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
