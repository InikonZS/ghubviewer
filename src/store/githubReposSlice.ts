import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendCreateRepo, sendDeleteRepo, sendGetRepoList, sendUpdateRepo } from "../api/github";
import fakeApi from "../api/fakeApi";
import { IEditableRepoData, IRepoData, IServerRepoData } from "../types/repo";

const formatClientRepo = (data: IServerRepoData, status: string): IRepoData=>{
    return {
        ...data,
        clientStatus: status
    }
}

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
        confirmRepoOperation: (state, action: PayloadAction<string>)=>{
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>{
                if (it.name == action.payload){
                    const nextStatus = ['deleteSuccess', 'createError'].includes(it.clientStatus) ? 'deleted' : 'ready';
                    return formatClientRepo(it, nextStatus);
                }
                return it;
            }).filter(it => it.clientStatus != 'deleted');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserRepos.fulfilled, (state, action) => {
            state.getUserRepos.repos = action.payload.map((it: IServerRepoData)=>formatClientRepo(it, 'ready'));
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
            //state.getUserRepos.repos.push(formatClientRepo(action.payload, 'createSuccess'));
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(action.payload, 'createSuccess') : it);
            state.createRepo.error = null;
            state.createRepo.loading = false;
        });
        builder.addCase(createRepo.rejected, (state, action) => {
            state.createRepo.response = null;
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'createError') : it);
            state.createRepo.error = action.error.message;
            state.createRepo.loading = false;
        });
        builder.addCase(createRepo.pending, (state, action) => {
            state.getUserRepos.repos.push(formatClientRepo({
                id: 0,
                html_url: "",
                stargazers_count: 0,
                forks_count: 0,
                language: "",
                name: action.meta.arg.data.name,
                private: action.meta.arg.data.private,
                description: action.meta.arg.data.description,
                owner: {
                    login: action.meta.arg.owner
                }
            }, 'createPending'));
            state.createRepo.response = null;
            state.createRepo.error = null;
            state.createRepo.loading = true;
        });

        
        builder.addCase(deleteRepo.fulfilled, (state, action) => {
            //state.getUserRepos.repos = state.getUserRepos.repos.filter((it)=>it.name != action.meta.arg.data.name);
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'deleteSuccess') : it);
            state.deleteRepo.error = null;
            state.deleteRepo.loading = false;
        });
        builder.addCase(deleteRepo.rejected, (state, action) => {
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'deleteError') : it);
            state.deleteRepo.error = action.error.message;
            state.deleteRepo.loading = false;
        });
        builder.addCase(deleteRepo.pending, (state, action) => {
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'deletePending') : it);
            state.deleteRepo.error = null;
            state.deleteRepo.loading = true;
        });

        builder.addCase(updateRepo.fulfilled, (state, action) => {
            state.updateRepo.response = action.payload;
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(action.payload, 'updateSuccess') : it);
            //state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.payload.name ? action.payload : it);
            state.updateRepo.error = null;
            state.updateRepo.loading = false;
        });
        builder.addCase(updateRepo.rejected, (state, action) => {
            state.updateRepo.response = null;
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'updateError') : it);
            state.updateRepo.error = action.error.message;
            state.updateRepo.loading = false;
        });
        builder.addCase(updateRepo.pending, (state, action) => {
            state.updateRepo.response = null;
            state.getUserRepos.repos = state.getUserRepos.repos.map((it)=>it.name == action.meta.arg.data.name ? formatClientRepo(it, 'updatePending') : it);
            state.updateRepo.error = null;
            state.updateRepo.loading = true;
        });
    }
});

export const getUserRepos = createAsyncThunk('github/getRepos', async (data:{token: string, mock: boolean}) => {
    const response = await (data.mock ? fakeApi.sendGetRepoList(data.token) : sendGetRepoList(data.token));
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

export const createRepo = createAsyncThunk('github/createRepo', async (data: {token: string, owner: string, mock: boolean, data: IEditableRepoData}) => {
    const response = await (data.mock ? fakeApi.sendCreateRepo(data.token, data.owner, data.data) : sendCreateRepo(data.token, data.owner, data.data))
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

export const updateRepo = createAsyncThunk('github/updateRepo', async (data: {token: string, owner: string, mock: boolean, data: IEditableRepoData}) => {
    const response = await (data.mock ? fakeApi.sendUpdateRepo(data.token, data.owner, data.data) : sendUpdateRepo(data.token, data.owner, data.data))
    if (response.ok) {
        return await response.json();
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

export const deleteRepo = createAsyncThunk('github/deleteRepo', async (data: {token: string, owner: string, mock: boolean, data: IEditableRepoData}) => {
    const response = await (data.mock ? fakeApi.sendDeleteRepo(data.token, data.owner, data.data) : sendDeleteRepo(data.token, data.owner, data.data))
    if (response.ok) {
        return;
    }

    const error = await response.json();
    console.log(error.message)
    throw new Error(error.message);
});

