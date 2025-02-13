import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import type { RootState } from './store';
import { logout } from './sessionSlice';

// Types
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
    name?: string; // Added name filter
  };
  page: number;
  dogsPerPage: number;
  sort?: string;
  url?: string;
}

const initialState: DogState = {
  dogs: [],
  favorites: [],
  total: 0,
  next: null,
  prev: null,
  status: 'idle',
  error: null,
  matchResult: null,
  isLoading: false
};

// Async thunks
export const fetchDogs = createAsyncThunk(
  'dogs/fetchDogs',
  async ({ filters, page, dogsPerPage, sort, url }: SearchParams, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const fetchUrl = url
        ? `${BASE_URL}${url}`
        : `${BASE_URL}/dogs/search?${new URLSearchParams({
            ...(filters.breed && { breeds: filters.breed }),
            ...(filters.zip_code && { zipCodes: filters.zip_code }),
            ...(filters.ageMin && { ageMin: filters.ageMin.toString() }),
            ...(filters.ageMax && { ageMax: filters.ageMax.toString() }),
            ...(filters.name && { name: filters.name }), 
            ...(sort && { sort })
          }).toString()}`;

          console.log(fetchUrl);
          

      const response = await fetch(fetchUrl, {
        credentials: 'include'
      });

      if (response.status === 401) {
        console.log('401 error');
        
        dispatch(logout()); // Dispatch logout action on 401
        throw new Error('Unauthorized');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const dogDetailsResponse = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.resultIds),
        credentials: 'include'
      });

      if (!dogDetailsResponse.ok) {
        throw new Error(`HTTP error! status: ${dogDetailsResponse.status}`);
      }

      const dogDetails = await dogDetailsResponse.json();

      return {
        dogDetails,
        total: data.total,
        next: data.next || null,
        prev: data.prev || null
      };
    } catch (error) {
      console.error('Error fetching dogs:', error);
      throw error;
    }
  }
);

export const generateMatch = createAsyncThunk(
  'dogs/generateMatch',
  async (favoriteIds: string[]) => {
    console.log('GENERATING MATCH');
    
    // First, get the match ID
    const matchResponse = await fetch(`${BASE_URL}/dogs/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favoriteIds),
      credentials: 'include'
    });

    if (!matchResponse.ok) {
      throw new Error('Failed to generate match');
    }

    const matchData = await matchResponse.json();
    const matchId = matchData.match;

    // Then, fetch the dog details using the match ID
    const dogDetailsResponse = await fetch(`${BASE_URL}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([matchId]),
      credentials: 'include'
    });

    if (!dogDetailsResponse.ok) {
      throw new Error('Failed to fetch matched dog details');
    }

    const dogDetails = await dogDetailsResponse.json();

    console.log(dogDetails);
    

    return dogDetails[0]; // Return the full dog object
  }
);

// Slice
const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const dogId = action.payload;
      const index = state.favorites.indexOf(dogId);
      if (index === -1) {
        state.favorites.push(dogId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    clearMatch: (state) => {
      state.matchResult = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dogs
      .addCase(fetchDogs.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.total = action.payload.total;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
        state.dogs = action.payload.dogDetails;
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dogs';
      })
      // Generate Match
      .addCase(generateMatch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateMatch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matchResult = action.payload;
      })
      .addCase(generateMatch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to generate match';
      });
  }
});

// Actions
export const { toggleFavorite, clearFavorites, clearMatch } = dogSlice.actions;

// Selectors
export const selectDogs = (state: RootState) => state.dogs.dogs;
export const selectTotal = (state: RootState) => state.dogs.total;
export const selectNext = (state: RootState) => state.dogs.next;
export const selectPrev = (state: RootState) => state.dogs.prev;
export const selectFavorites = (state: RootState) => state.dogs.favorites;
export const selectMatchResult = (state: RootState) => state.dogs.matchResult;
export const selectStatus = (state: RootState) => state.dogs.status;
export const selectError = (state: RootState) => state.dogs.error;
export const selectIsLoading = (state: RootState) => state.dogs.isLoading;

export default dogSlice.reducer;