import React, { useEffect, useState } from "react";
import { MainButton } from "../common/Common";
import { IRepoData } from "../../types/repo";
import { useAppDispatch } from "../../store/rootStore";
import { githubReposSlice } from "../../store/githubReposSlice";
import "./RepoItem.css";

interface IRepoItemProps {
    onEdit: ()=>void;
    onDelete: (force: boolean)=>void;
    repo: IRepoData
}

export const RepoItem = ({repo, onDelete, onEdit}: IRepoItemProps)=>{
    const [forceDelete, setForceDelete] = useState(false);

    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (['ready', 'deletePending', 'updatePending', 'createPending'].includes(repo.clientStatus)){
            return
        }
        const tid = setTimeout(()=>{
            dispatch(githubReposSlice.actions.confirmRepoOperation(repo.name));
        }, 1000);
        return ()=>{
            clearTimeout(tid);
        }
    }, [repo.clientStatus]);
    
    useEffect(()=>{
        const handler = (e: KeyboardEvent)=>{
            if (e.code == 'ControlLeft'){
               setForceDelete(true); 
            }
        }
        const handlerUp = (e: KeyboardEvent)=>{
            if (e.code == 'ControlLeft'){
                setForceDelete(false); 
             }
        }
        window.addEventListener('keydown', handler);
        window.addEventListener('keyup', handlerUp); 
        return ()=>{
            window.removeEventListener('keydown', handler);
            window.removeEventListener('keyup', handlerUp);
        }
    }, [])

    return <div className={`RepoItem_collapser RepoItem_status--${repo.clientStatus}`}>
        <div className={`RepoItem_collapser_contentWrap`}>
        <div className={`RepoItem`}>
        <div className="RepoItem_statusBlock">{repo.clientStatus}</div>
        <div className="RepoItem_repoInfo">
            <h3 className="RepoItem_name">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
                </a>
            </h3>
            <p className="RepoItem_description">{repo.description || 'No description'}</p>
            <div className="RepoItem_statList">
                <span className="RepoItem_stat">
                ⭐ {repo.stargazers_count}
                </span>
                <span className="RepoItem_stat">
                🍴 {repo.forks_count}
                </span>
                {repo.language && (
                <span className="RepoItem_stat">
                    {repo.language}
                </span>
                )}
                {repo.private && (
                    <span className="RepoItem_stat">
                        Private
                    </span>
                )}
            </div>
        </div>
        <div className="RepoItem_actionList">
            <MainButton className="RepoItem_action" onClick={()=>{
                if (repo.clientStatus == 'ready') {onEdit()}
            }}>Edit</MainButton>
            <MainButton className={`RepoItem_action ${forceDelete ? 'RepoItem_action--force' : ''}`} onClick={()=>{
                if (repo.clientStatus == 'ready') {onDelete(forceDelete)}
            }}>Delete</MainButton>
        </div>
    </div>
    </div>
    </div> 
}