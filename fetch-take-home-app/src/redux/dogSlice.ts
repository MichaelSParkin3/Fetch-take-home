import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';

// Define the initial state
const initialState = {
  dogs: [],
  total: 0,
  next: null,
  prev: null,
  status: 'idle',
  error: null
};

// Async thunk to fetch dogs
export const fetchDogs = createAsyncThunk(
  'dogs/fetchDogs',
  async ({
    filters,
    page,
    dogsPerPage,
    url
  }: {
    filters: any;
    page: number;
    dogsPerPage: number;
    url?: string;
  }) => {
    try {
      const fetchUrl = url
        ? `${BASE_URL}${url}`
        : `${BASE_URL}/dogs/search?${new URLSearchParams({
            ...(filters.breed && { breeds: filters.breed }),
            ...(filters.zip_code && { zipCodes: filters.zip_code }),
            ...(filters.ageMin && { ageMin: filters.ageMin.toString() }),
            ...(filters.ageMax && { ageMax: filters.ageMax.toString() })
          }).toString()}`;

      // Fetch dog IDs based on filters or URL
      const response = await fetch(fetchUrl, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      // Fetch detailed dog information using the resultIds
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

      console.log(dogDetails);

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

// Create the dog slice
const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload.total;
        state.next = action.payload.next;
        state.prev = action.payload.prev;
        state.dogs = action.payload.dogDetails;
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectDogs = (state) => state.dogs.dogs;
export const selectTotal = (state) => state.dogs.total;
export const selectNext = (state) => state.dogs.next;
export const selectPrev = (state) => state.dogs.prev;

export default dogSlice.reducer;
