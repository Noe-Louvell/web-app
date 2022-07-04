import { createSlice, SerializedError, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  accessToken: string
  isLoading: AuthStates
  user?: {
    nom?: string
    email?: string
  }
  error?: SerializedError
}

// That's what we will store in the auth slice.
const internalInitialState: AuthSliceState = {
  accessToken: '',
  isLoading: AuthStates.IDLE,
  user: null,
  error: null,
}

// createSlice
export const authSlice = createSlice({
  name: 'auth', // name of the slice that we will use.
  initialState: internalInitialState,
  reducers: {
     // here will end up non async basic reducers.
    updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {} // here will end up async more complex reducers.
})

export const fetchUser = createAsyncThunk('auth/user', async (_, thunkAPI) => {
    try {
      const response = await axios.get<{ name: string; email: string; type: string }>('api/user') // Call proxy server (api/pages/me.ts)
  
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  })
  
  
  export const register = createAsyncThunk(
    'register',
    async (credentials: { email: string; password: string; name: string }, thunkAPI) => {
      try {
        // Register the user with credentials payload (email, password, name)
        const response = await axios.post<{ accessToken: string }>('api/register', credentials) // Call proxy server (api/pages/register.ts)
        // If it succeds -> refetch the user 'api/me' so we're logged in automatically after registration.
        const refetch = await axios.get<{ name: string }>('api/me', {
          headers: { Authorization: `Bearer ${response.data.accessToken}` },
        })
        // return access token + user data
        return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
      } catch (error) {
        // push error further
        return thunkAPI.rejectWithValue({ error: error.message })
      }
    }
  )
  
  export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, thunkAPI) => {
      try {
        const response = await axios.post<{ accessToken: string }>('api/login', credentials)
        const refetch = await axios.get<{ name: string }>('api/me', {
          headers: { Authorization: `Bearer ${response.data.accessToken}` },
        })
        return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
      } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
      }
    }
  )
  
  export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      const response = await axios.delete<{ accessToken: string }>('api/logout')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  })

// Actions generated automatically by createSlice function
export const { updateAccessToken, reset } = authSlice.actions