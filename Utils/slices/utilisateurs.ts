

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export enum UserStates {
  IDLE = 'idle',
  LOADING = 'loading',
}


const internalInitialState = {
  loading: UserStates.IDLE,
  users: [],
  error: null,
}

export const utilisateursSlice = createSlice({
  name: 'utilisateurs',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {},
})

export const fetchUtilisateurs = createAsyncThunk('/utilisateurs', async (_, thunkAPI) => {
    try {
      const response = await axios.get<{ hits: any[] }>('utilisateurs') // Call proxy server (api/pages/frogs.ts)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const { reset } = utilisateursSlice.actions