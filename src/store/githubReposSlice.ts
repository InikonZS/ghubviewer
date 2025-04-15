import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendCreateRepo } from "../api/github";

export const githubReposSlice = createSlice({
    name: 'counter',
    initialState: {
        getUserRepos: {
            repos: null,
            error: null,
            loading: false
        },
        createRepo: {
            response: null,
            error: null,
            loading: false
        }
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserRepos.fulfilled, (state, action) => {
            state.getUserRepos.repos = action.payload;
            state.getUserRepos.error = null;
            state.getUserRepos.loading = false;
        });
        builder.addCase(getUserRepos.rejected, (state, action) => {
            state.getUserRepos.repos = null;
            state.getUserRepos.error = action.error.message;
            state.getUserRepos.loading = false;
        });
        builder.addCase(getUserRepos.pending, (state, action) => {
            state.getUserRepos.repos = null;
            state.getUserRepos.error = null;
            state.getUserRepos.loading = true;
        });

        builder.addCase(createRepo.fulfilled, (state, action) => {
            state.createRepo.response = action.payload;
            state.getUserRepos.repos.push(action.payload);
            state.createRepo.error = null;
            state.createRepo.loading = false;
        });
        builder.addCase(createRepo.rejected, (state, action) => {
            state.createRepo.response = null;
            state.createRepo.error = action.error.message;
            state.createRepo.loading = false;
        });
        builder.addCase(createRepo.pending, (state, action) => {
            state.createRepo.response = null;
            state.createRepo.error = null;
            state.createRepo.loading = true;
        });
    }
});

export const getUserRepos = createAsyncThunk('github/getRepos', async (token: string) => {
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

export const createRepo = createAsyncThunk('github/createRepo', async (data: {token: string, data: any}) => {
    const response = await sendCreateRepo(data.token, data.data)
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});
