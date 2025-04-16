import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserInfo } from "../types/repo";
import { sendLogin } from "../api/github";
import { sendLogin as sendMockLogin } from "../api/fakeApi";

const initialState: {
    userInfo: IUserInfo,
    authError: string,
    loading: boolean,
    token: string,
    mockLogin: boolean,
} = {
      userInfo: null,
      authError: null,
      loading: false,
      token: '',
      mockLogin: false
    }

export const githubAuthSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
      logout: (state=>{
        state.loading = false;
        state.userInfo = null;
        state.authError = null;
        state.token = '';
        state.mockLogin = false;
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
        state.token = action.meta.arg.token;
        state.mockLogin = action.meta.arg.mockLogin;
        state.userInfo = null;
        state.authError = null;
        state.loading = true;
      })
    }
  });
  
  export const authGithubByPersonalToken = createAsyncThunk('github/auth', async (data:{token: string, mockLogin: boolean})=>{
    const response = await (data.mockLogin ? sendMockLogin(data.token) : sendLogin(data.token));
    if (response.ok){
      return await response.json();
    }
  
    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
  });