import { configureStore } from "@reduxjs/toolkit";
import { githubAuthSlice } from "./githubAuthSlice";
import { githubReposSlice } from "./githubReposSlice";
import { routesSlice } from "./routesSlice";
import { useDispatch, useSelector } from "react-redux";

export const rootStore = configureStore({
    reducer: {
        githubAuth: githubAuthSlice.reducer,
        githubRepos: githubReposSlice.reducer,
        routes: routesSlice.reducer
    },
});

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();