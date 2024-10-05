import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) : null;

// Initial state
const initialState = {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
};

// Register User
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const { data } = await axios.post('/api/auth/register', { name, email, password }, config);
    
            // Save user info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

        return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Registration failed');
        }
    }
);

// Login User
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            
            // Save user info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Login failed');
        }
    }
);

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('userInfo');
});

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // Register
        [register.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Login
        [login.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Logout
        [logout.fulfilled]: (state) => {
            state.userInfo = null;
        },
    },
});

export default authSlice.reducer;