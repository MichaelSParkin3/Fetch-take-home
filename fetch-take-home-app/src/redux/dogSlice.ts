import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';

// Define the initial state
const initialState = {
  dogs: [],
  total: 0,
  status: 'idle',
  error: null,
};

// Async thunk to fetch dogs
export const fetchDogs = createAsyncThunk(
  'dogs/fetchDogs',
  async ({ filters, page, dogsPerPage }: { filters: any; page: number; dogsPerPage: number }) => {
    console.log('fetching dogs: '+filters);
    console.log(filters);
    

    try {
      // Construct query parameters based on filters
      const queryParams = new URLSearchParams();
      if (filters.breed) queryParams.append('breeds', filters.breed);
      if (filters.zip_code) queryParams.append('zipCodes', filters.zip_code);
      if (filters.ageMin) queryParams.append('ageMin', filters.ageMin.toString());
      if (filters.ageMax) queryParams.append('ageMax', filters.ageMax.toString());
    

        console.log(queryParams);
        

      // Fetch dog IDs based on filters
      const response = await fetch(`${BASE_URL}/dogs/search?${queryParams.toString()}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('first data:', data);

      // Fetch detailed dog information using the resultIds
      const dogDetailsResponse = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.resultIds),
        credentials: 'include',
      });

      if (!dogDetailsResponse.ok) {
        throw new Error(`HTTP error! status: ${dogDetailsResponse.status}`);
      }

      const dogDetails = await dogDetailsResponse.json();
      console.log('dog details:', dogDetails);

      return { dogDetails, total: data.total };
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
        state.dogs = action.payload.dogDetails;
        state.total = action.payload.total;
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectDogs = (state) => state.dogs.dogs;
export const selectTotal = (state) => state.dogs.total;

export default dogSlice.reducer;