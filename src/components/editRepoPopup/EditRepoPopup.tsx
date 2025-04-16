import React, { useEffect, useState } from "react"
import { MainButton, PopupShadow, PopupWrapper } from "../common/Common";
import { CheckBox } from "../common/CommonCheckBox";
import "./EditRepoPopup.css";
import { IEditableRepoData } from "../../types/repo";

interface IEditRepoPopupProps{
    onClose: ()=>void,
    onSave: (data: IEditableRepoData)=>void,
    repoData?: IEditableRepoData
}

export const EditRepoPopup = ({onClose, onSave, repoData}: IEditRepoPopupProps)=>{
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    
    useEffect(()=>{
        if (!repoData){
            return;
        }
        setRepoName(repoData.name);
        setRepoDescription(repoData.description);
        setIsPrivate(repoData.private);
    }, [repoData]);

    const [popupState, setPopupState] = useState('initial');
    useEffect(()=>{
        if (popupState == 'initial') {
            setPopupState('fadeIn'); 
        }  
        if (popupState == 'fadeIn') {
            setTimeout(()=>{
                setPopupState('ready')
            });
        }     
    }, [popupState]);

    const handleCancel = ()=>{
        if (popupState == 'ready'){
            setPopupState('fadeOut');
            setTimeout(()=>{
                onClose();
            }, 400);
        }
    }

    const handleOk = (data: IEditableRepoData)=>{
        if (popupState == 'ready'){
            setPopupState('fadeOut');
            onSave(data);
            setTimeout(()=>{
                onClose()
            }, 400);
        }
    }

    return <PopupShadow className={`EditRepoPopup_shadow EditRepoPopup_states--${popupState}`}>
        <PopupWrapper className="EditRepoPopup">
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
                <div className="EditRepoPopup_form_block EditRepoPopup_privateSet">
                    <CheckBox onCheck={(value)=>{setIsPrivate(value)}} checked={isPrivate} label={
                       <span className="EditRepoPopup_privateSet_label">Private repo</span> 
                    }></CheckBox>
                </div>
            </div>
            <div className="EditRepoPopup_actionList">
                <MainButton className="EditRepoPopup_action" onClick={handleCancel}>close</MainButton>
                <MainButton className="EditRepoPopup_action" onClick={()=>handleOk({name: repoName, description: repoDescription, private: isPrivate})}>save</MainButton>
            </div>
        </PopupWrapper>
    </PopupShadow>
}