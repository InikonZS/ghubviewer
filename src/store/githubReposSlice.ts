import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendCreateRepo, sendDeleteRepo, sendUpdateRepo } from "../api/github";
import { IEditableRepoData, IRepoData } from "../types/repo";

const initialState: {
    getUserRepos: {
        repos: IRepoData[],
        error: string,
        loading: boolean
    },
    createRepo: {
        response: IRepoData,
        error: string,
        loading: boolean
    },
    updateRepo: {
        response: IRepoData,
        error: string,
        loading: boolean
    },
    deleteRepo: {
        error: string,
        loading: boolean
    },
} = {
    getUserRepos: {
        repos: null,
        error: null,
        loading: false
    },
    createRepo: {
        response: null,
        error: null,
        loading: false
    },
    updateRepo: {
        response: null,
        error: null,
        loading: false
    },
    deleteRepo: {
        error: null,
        loading: false
    }
}

export const githubReposSlice = createSlice({
    name: 'counter',
    initialState: initialState,
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

        
        builder.addCase(deleteRepo.fulfilled, (state, action) => {
            state.getUserRepos.repos = state.getUserRepos.repos.filter((it)=>it.name != action.meta.arg.data.name);
            state.deleteRepo.error = null;
            state.deleteRepo.loading = false;
        });
        builder.addCase(deleteRepo.rejected, (state, action) => {
            state.deleteRepo.error = action.error.message;
            state.deleteRepo.loading = false;
        });
        builder.addCase(deleteRepo.pending, (state, action) => {
            state.deleteRepo.error = null;
            state.deleteRepo.loading = true;
        });

        builder.addCase(updateRepo.fulfilled, (state, action) => {
            state.updateRepo.response = action.payload;
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.payload.name ? action.payload : it);
            state.updateRepo.error = null;
            state.updateRepo.loading = false;
        });
        builder.addCase(updateRepo.rejected, (state, action) => {
            state.updateRepo.response = null;
            state.updateRepo.error = action.error.message;
            state.updateRepo.loading = false;
        });
        builder.addCase(updateRepo.pending, (state, action) => {
            state.updateRepo.response = null;
            state.updateRepo.error = null;
            state.updateRepo.loading = true;
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

export const createRepo = createAsyncThunk('github/createRepo', async (data: {token: string, data: IEditableRepoData}) => {
    const response = await sendCreateRepo(data.token, data.data)
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

export const updateRepo = createAsyncThunk('github/updateRepo', async (data: {token: string, owner: string, data: IEditableRepoData}) => {
    const response = await sendUpdateRepo(data.token, data.owner, data.data)
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

export const deleteRepo = createAsyncThunk('github/deleteRepo', async (data: {token: string, owner: string, data: IEditableRepoData}) => {
    const response = await sendDeleteRepo(data.token, data.owner, data.data)
    if (response.ok) {
        return;
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

