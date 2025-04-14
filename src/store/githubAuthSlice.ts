import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const githubAuthSlice = createSlice({
    name: 'counter',
    initialState: {
      userInfo: null,
      authError: null,
      loading: false,
      token: '',
    },
    reducers: {
      logout: (state=>{
        state.loading = false;
        state.userInfo = null;
        state.authError = null;
        state.token = '';
      })
    },
    extraReducers: (builder)=>{
      builder.addCase(authGithubByPersonalToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.authError = null;
        state.loading = false;
      });
      builder.addCase(authGithubByPersonalToken.rejected, (state, action) => {
        state.userInfo = null;
        state.authError = action.error.message;
        state.loading = false;
      });
      builder.addCase(authGithubByPersonalToken.pending, (state, action) => {
        state.token = action.meta.arg;
        state.userInfo = null;
        state.authError = null;
        state.loading = true;
      })
    }
  });
  
  export const authGithubByPersonalToken = createAsyncThunk('github/auth', async (token: string)=>{
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      }
    });
    if (response.ok){
      return await response.json();
    }
  
    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
  });