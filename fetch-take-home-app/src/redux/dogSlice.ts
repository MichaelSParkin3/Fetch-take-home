import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  async ({ page, dogsPerPage }: { page: number; dogsPerPage: number }) => {
    const response = await fetch(`/dogs/search?size=${dogsPerPage}&from=${(page - 1) * dogsPerPage}`);
    const data = await response.json();
    
    // Fetch detailed dog information using the resultIds
    const dogDetailsResponse = await fetch('/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.resultIds),
    });
    const dogDetails = await dogDetailsResponse.json();
    
    return { dogDetails, total: data.total };
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