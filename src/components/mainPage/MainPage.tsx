import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { githubAuthSlice } from "../../store/githubAuthSlice";
import { getUserRepos } from "../../store/githubReposSlice";
import { routesSlice } from "../../store/routesSlice";
import "./MainPage.css";

export const MainPage = ()=>{
    const dispatch = useAppDispatch();
    const {userInfo, authError, loading, token} = useAppSelector(state=>state.githubAuth);
    const {repos, error: reposError, loading: reposLoading} = useAppSelector(state=>state.githubRepos);

    useEffect(()=>{
        if (userInfo){
            dispatch(getUserRepos(token));
            dispatch(routesSlice.actions.navigate('main'));
        }
    }, [userInfo]);
    return <div className="MainPage">
        main
        <button onClick={()=>{
            dispatch(githubAuthSlice.actions.logout());
            dispatch(routesSlice.actions.navigate('auth'));
        }}>logout</button>

        
        {repos && <div>{JSON.stringify(repos)}</div>}
        {reposError &&  <div>{reposError}</div>}
        {reposLoading && <div>loading repos...</div>}
    </div>
}