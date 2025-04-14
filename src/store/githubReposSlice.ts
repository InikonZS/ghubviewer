import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const githubReposSlice = createSlice({
    name: 'counter',
    initialState: {
        repos: null,
        error: null,
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserRepos.fulfilled, (state, action) => {
            state.repos = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getUserRepos.rejected, (state, action) => {
            state.repos = null;
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(getUserRepos.pending, (state, action) => {
            state.repos = null;
            state.error = null;
            state.loading = true;
        })
    }
});

export const getUserRepos = createAsyncThunk('github/repos', async (token: string) => {
    const response = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        }
    });
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});
