import type { RootState } from './store';
interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}
interface DogState {
    dogs: Dog[];
    favorites: string[];
    total: number;
    next: string | null;
    prev: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    matchResult: Dog | null;
    isLoading: boolean;
}
interface SearchParams {
    filters: {
        breed?: string;
        zip_code?: string;
        ageMin?: number;
        ageMax?: number;
        name?: string;
    };
    page: number;
    dogsPerPage: number;
    sort?: string;
    url?: string;
}
export declare const fetchDogs: import("@reduxjs/toolkit").AsyncThunk<{
    dogDetails: any;
    total: any;
    next: any;
    prev: any;
}, SearchParams, {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const generateMatch: import("@reduxjs/toolkit").AsyncThunk<any, string[], {
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction>;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const toggleFavorite: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "dogs/toggleFavorite">, clearFavorites: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"dogs/clearFavorites">, clearMatch: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"dogs/clearMatch">;
export declare const selectDogs: (state: RootState) => Dog[];
export declare const selectTotal: (state: RootState) => number;
export declare const selectNext: (state: RootState) => string | null;
export declare const selectPrev: (state: RootState) => string | null;
export declare const selectFavorites: (state: RootState) => string[];
export declare const selectMatchResult: (state: RootState) => Dog | null;
export declare const selectStatus: (state: RootState) => "idle" | "loading" | "succeeded" | "failed";
export declare const selectError: (state: RootState) => string | null;
export declare const selectIsLoading: (state: RootState) => boolean;
declare const _default: import("redux").Reducer<DogState>;
export default _default;
