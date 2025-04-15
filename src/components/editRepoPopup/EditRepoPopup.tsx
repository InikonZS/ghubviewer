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

    return <div className="EditRepoPopup_shadow">
        <div className="EditRepoPopup">
            <div className="EditRepoPopup_title">{repoData ? "edit repo" : "add repo"}</div>
            <div className="EditRepoPopup_form">
                <div className="EditRepoPopup_form_block">
                    <span className="EditRepoPopup_form_block_title">name</span>
                    <input className="EditRepoPopup_form_block_input" value={repoName} onChange={(e)=>{setRepoName(e.target.value)}}></input>
                </div>
                <div className="EditRepoPopup_form_block">
                    <span className="EditRepoPopup_form_block_title">description</span>
                    <textarea className="EditRepoPopup_form_block_input" style={{height: '80px'}} value={repoDescription} onChange={(e)=>{setRepoDescription(e.target.value)}}></textarea>
                </div>
                <div className="EditRepoPopup_form_block">
                    <span>private</span>
                    <button className={`${isPrivate ? '' : ''}`} onClick={()=>setIsPrivate(last=>!last)}>isPrivate</button>
                </div>
            </div>
            <div className="EditRepoPopup_actionList">
                <button className="EditRepoPopup_action" onClick={()=>onClose()}>close</button>
                <button className="EditRepoPopup_action" onClick={()=>onSave({name: repoName, description: repoDescription, private: isPrivate})}>save</button>
            </div>
        </div>
    </div>
}