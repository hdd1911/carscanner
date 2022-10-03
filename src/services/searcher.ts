import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SEARCHER_API } from '../constants';

export interface SuggestHintsQuery {
    text: string;
}

export interface QueryResponse<T> {
    success: boolean;
    data: T;
}

export interface SuggestHintsData {
    hints: Hint[];
    total: number;
}

export interface Hint {
    title: string;
    brand_id: number;
    model_id: number;
    folder_id: number;
    cars_count: number;
}

//

export interface GetCarsQuery {
    page: number;
    per_page: number;
    filter: {
        catalog: {
            model_id: (number | undefined)[];
        }[];
    };
}

export interface GetCarsData {
    results: Car[] | null;
    total: number;
}

export interface Car {
    id: number;
    title: string;
    price: string;
}

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
