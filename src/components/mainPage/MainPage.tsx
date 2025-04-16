import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { githubAuthSlice } from "../../store/githubAuthSlice";
import { createRepo, deleteRepo, getUserRepos, updateRepo } from "../../store/githubReposSlice";
import { routesSlice } from "../../store/routesSlice";
import { RepoItem } from "../repoItem/RepoItem";
import { EditRepoPopup } from "../editRepoPopup/EditRepoPopup";
import { DeleteRepoPopup } from "../deleteRepoPopup/DeleteRepoPopup";
import { GoodScroll } from "../common/GoodScroll";
import "./MainPage.css";
import { IRepoData } from "../../types/repo";

export const MainPage = ()=>{
    const dispatch = useAppDispatch();
    const {userInfo, authError, loading, token, mockLogin} = useAppSelector(state=>state.githubAuth);
    const {repos, error: reposError, loading: reposLoading} = useAppSelector(state=>state.githubRepos.getUserRepos);
    const [editRepoItem, setEditRepoItem] = useState<IRepoData>(null);
    const [showEditRepoPopup, setShowEditRepoPopup] = useState<boolean>(false);
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState<boolean>(false);

    useEffect(()=>{
        if (userInfo){
            dispatch(getUserRepos({token: token, mock: mockLogin}));
            dispatch(routesSlice.actions.navigate('main'));
        }
    }, [userInfo]);
    return <div className="MainPage">
        <div className="MainPage_header">
            <div className="MainPage_userData">
                <div className="MainPage_userAvatar" style={{backgroundImage: `url(${userInfo.avatar_url})`}}></div>
                <div className="MainPage_userLogin">
                    {userInfo.login}
                </div>
            </div>
            <button className="MainPage_logout" onClick={()=>{
                dispatch(githubAuthSlice.actions.logout());
                dispatch(routesSlice.actions.navigate('auth'));
            }}>logout</button>
        </div>
        
        <div className="MainPage_controls">
            <button className="MainPage_createRepo" onClick={()=>{
                //dispatch(githubAuthSlice.actions.logout());
                setShowEditRepoPopup(true);
                setEditRepoItem(null);
            }}>Create repo</button>
        </div>

        {reposError && <div>{reposError}</div>}
        {reposLoading && <div>loading repos...</div>}
        {repos && repos.length == 0 && <div>There are no repos. Try to create new one.</div>}
        <GoodScroll>
            {repos && <div className="MainPage_repoList">{repos.map((repo)=><RepoItem 
                key={repo.name}
                repo={repo}
                onEdit={()=>{
                    setShowEditRepoPopup(true);
                    setEditRepoItem(repo)
                }}
                onDelete={(force)=>{
                    if (force){
                        dispatch(deleteRepo({token, owner: repo.owner.login, data: repo, mock: mockLogin}));
                    } else {
                        setShowConfirmDeletePopup(true);
                        setEditRepoItem(repo)
                    }
                }}
            ></RepoItem>)}</div>}
        </GoodScroll>
        
        {showEditRepoPopup && <EditRepoPopup 
            repoData={editRepoItem}
            onClose={()=>setShowEditRepoPopup(false)} 
            onSave={(data)=>{
                if (editRepoItem){
                    dispatch(updateRepo({token, owner: editRepoItem.owner.login, data, mock: mockLogin}));
                } else {
                    dispatch(createRepo({token, owner: userInfo.login, data, mock: mockLogin}));
                }
            }}
        ></EditRepoPopup>}
        {showConfirmDeletePopup && <DeleteRepoPopup
            repoData={editRepoItem} 
            onOk={()=>{
                dispatch(deleteRepo({token, owner: editRepoItem.owner.login, data: editRepoItem, mock: mockLogin}));
                setShowConfirmDeletePopup(false);
                }
            }
            onClose={()=>{
                setShowConfirmDeletePopup(false);
                }
            }
        ></DeleteRepoPopup>}
    </div>
}