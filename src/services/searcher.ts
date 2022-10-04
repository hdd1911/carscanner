import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SEARCHER_API } from '../constants';
import {
    GetCarsData,
    GetCarsQuery,
    Hint,
    QueryResponse,
    SuggestHintsData,
    SuggestHintsQuery,
} from './searcher.models';

export const searcherApi = createApi({
    reducerPath: 'searcher',
    baseQuery: fetchBaseQuery({ baseUrl: SEARCHER_API.BASE_URL }),
    endpoints: build => ({
        suggestHints: build.query<Hint[], SuggestHintsQuery>({
            query: body => ({
                url: SEARCHER_API.SUGGEST_HINTS_URL,
                method: 'POST',
                body,
            }),
            transformResponse: (response: QueryResponse<SuggestHintsData>) => response.data.hints,
        }),
        getCars: build.query<GetCarsData, GetCarsQuery>({
            query: body => ({
                url: SEARCHER_API.GET_CARS_URL,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: QueryResponse<GetCarsData>) => response.data,
        }),
    }),
});

export const { useLazySuggestHintsQuery, useLazyGetCarsQuery } = searcherApi;
