import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { githubAuthSlice } from "../../store/githubAuthSlice";
import { getUserRepos } from "../../store/githubReposSlice";
import { routesSlice } from "../../store/routesSlice";
import { RepoItem } from "../repoItem/RepoItem";
import { EditRepoPopup } from "../editRepoPopup/EditRepoPopup";
import "./MainPage.css";

export const MainPage = ()=>{
    const dispatch = useAppDispatch();
    const {userInfo, authError, loading, token} = useAppSelector(state=>state.githubAuth);
    const {repos, error: reposError, loading: reposLoading} = useAppSelector(state=>state.githubRepos);
    const [editRepoItem, setEditRepoItem] = useState<any>(null);
    const [showEditRepoPopup, setShowEditRepoPopup] = useState<boolean>(false);
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState<boolean>(false);

    useEffect(()=>{
        if (userInfo){
            dispatch(getUserRepos(token));
            dispatch(routesSlice.actions.navigate('main'));
        }
    }, [userInfo]);
    return <div className="MainPage">
        main
        <button onClick={()=>{
            //dispatch(githubAuthSlice.actions.logout());
            setShowEditRepoPopup(true);
            setEditRepoItem(null);
        }}>create new repo</button>

        <button onClick={()=>{
            dispatch(githubAuthSlice.actions.logout());
            dispatch(routesSlice.actions.navigate('auth'));
        }}>logout</button>

        
        {repos && <div>{repos.map((repo: Array<any>)=><RepoItem 
            repo={repo}
            onEdit={()=>{
                setShowEditRepoPopup(true);
                setEditRepoItem(repo)
            }}
            onDelete={()=>{
                setShowConfirmDeletePopup(true);
                setEditRepoItem(repo)
            }}
        ></RepoItem>)}</div>}
        {reposError &&  <div>{reposError}</div>}
        {reposLoading && <div>loading repos...</div>}
        {showEditRepoPopup && <EditRepoPopup 
            onClose={()=>setShowEditRepoPopup(false)} 
            onSave={()=>{}}
        ></EditRepoPopup>}
        {showConfirmDeletePopup && <div>
            <button onClick={()=>{
                //
            }}>ok</button>
            <button onClick={()=>{
                setShowConfirmDeletePopup(false)
            }}>cancel</button>
        </div>}
    </div>
}