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
    price: number;
}
