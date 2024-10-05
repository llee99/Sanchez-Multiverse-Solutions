import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all services
export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/api/services');
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to fetch services');
        }
    }
);

// Create a new service
export const createService = createAsyncThunk(
    'services/createService',
    async ({ title, description }, { getState, rejectWithValue }) => {
        try {
            const { auth: { userInfo } } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('/api/services', { title, description }, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to create service');
        }
    }
);

// Update a service
export const updateService = createAsyncThunk(
    'services/updateService',
    async ({ id, title, description }, { getState, rejectWithValue }) => {
        try {
            const { auth: { userInfo } } = getState();
            const config = {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.put(`/api/services/${id}`, { title, description }, config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to update service');
        }
    }
);

// Delete a service
export const deleteService = createAsyncThunk(
    'services/deleteService',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth: { userInfo } } = getState();
            const config = {
                headers: { 
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            };
            await axios.delete(`/api/services/${id}`, config);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to delete service');
        }
    }
);

// Services Slice
const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // Fetch Services
        [fetchServices.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchServices.fulfilled]: (state, action) => {
            state.loading = false;
            state.services = action.payload;
        },
        [fetchServices.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    
        // Create Service
        [createService.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createService.fulfilled]: (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
        },
        [createService.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    
        // Update Service
        [updateService.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [updateService.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.services.findIndex(service => service._id === action.payload._id);
        if (index !== -1) {
            state.services[index] = action.payload;
        }
        },
        [updateService.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    
        // Delete Service
        [deleteService.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteService.fulfilled]: (state, action) => {
            state.loading = false;
            state.services = state.services.filter(service => service._id !== action.payload);
        },
        [deleteService.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default serviceSlice.reducer;