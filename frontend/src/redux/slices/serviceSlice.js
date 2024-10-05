// frontend/src/redux/slices/serviceSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchServices = createAsyncThunk('services/fetchServices', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/services');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch services');
  }
});

export const createService = createAsyncThunk('services/createService', async (serviceData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.userInfo.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post('/api/services', serviceData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to create service');
  }
});

export const updateService = createAsyncThunk('services/updateService', async ({ id, serviceData }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.userInfo.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(`/api/services/${id}`, serviceData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to update service');
  }
});

export const deleteService = createAsyncThunk('services/deleteService', async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.userInfo.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`/api/services/${id}`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete service');
  }
});

const serviceSlice = createSlice({
  name: 'services',
  initialState: { services: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(service => service._id === action.payload._id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(service => service._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
