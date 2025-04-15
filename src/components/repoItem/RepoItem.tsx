import React from "react"
import "./RepoItem.css";

interface IRepoItemProps {
    onEdit: ()=>void;
    onDelete: ()=>void;
    repo: any
}

export const RepoItem = ({repo, onDelete, onEdit}: IRepoItemProps)=>{
    return <div className="RepoItem">
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
            </div>
        </div>
        <div className="RepoItem_actionList">
            <button className="RepoItem_action" onClick={()=>{
                onEdit()
            }}>Edit</button>
            <button className="RepoItem_action" onClick={()=>{
                onDelete()
            }}>Delete</button>
        </div>
    </div>
}