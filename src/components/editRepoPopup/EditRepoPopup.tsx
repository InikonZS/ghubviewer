import React, { useEffect, useState } from "react"
import "./EditRepoPopup.css";

interface IEditRepoPopupProps{
    onClose: ()=>void,
    onSave: (data: any)=>void,
    repoData?: any
}

export const EditRepoPopup = ({onClose, onSave, repoData}: IEditRepoPopupProps)=>{
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const  [isPrivate, setIsPrivate] = useState(false);
    
    useEffect(()=>{
        if (!repoData){
            return;
        }
        setRepoName(repoData.name);
        setRepoDescription(repoData.description);
        setIsPrivate(repoData.private);
    }, [repoData]);

    return <div className="EditRepoPopup">
        <div>{repoData ? "edit repo" : "add repo"}</div>
        <div>
            <div>
                <span>name</span>
                <input value={repoName} onChange={(e)=>{setRepoName(e.target.value)}}></input>
            </div>
            <div>
                <span>description</span>
                <textarea value={repoDescription} onChange={(e)=>{setRepoDescription(e.target.value)}}></textarea>
            </div>
            <div>
                <span>private</span>
                <button className={`${isPrivate ? '' : ''}`} onClick={()=>setIsPrivate(last=>!last)}>isPrivate</button>
            </div>
        </div>
        <button onClick={()=>onClose()}>close</button>
        <button onClick={()=>onSave({name: repoName, description: repoDescription, private: isPrivate})}>save</button>
    </div>
}