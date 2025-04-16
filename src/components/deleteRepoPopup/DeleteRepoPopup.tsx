import React, { useEffect, useState } from "react"
import { MainButton, PopupShadow, PopupTitle, PopupWrapper } from "../common/Common";
import "./DeleteRepoPopup.css";
import { IEditableRepoData } from "../../types/repo";

interface IDeleteRepoPopupProps{
    onClose: ()=>void,
    onOk: ()=>void,
    repoData?: IEditableRepoData
}

export const DeleteRepoPopup = ({onClose, onOk, repoData}: IDeleteRepoPopupProps)=>{
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

    const handleOk = ()=>{
        if (popupState == 'ready'){
            setPopupState('fadeOut');
            setTimeout(()=>{
                onOk();
            }, 400);
        }
    }

    return <PopupShadow className={`DeleteRepoPopup_shadow DeleteRepoPopup_states--${popupState}`}>
        <PopupWrapper className="DeleteRepoPopup">
            <PopupTitle className="DeleteRepoPopup_title">{`Delete repo ${repoData.name}?`}</PopupTitle>
            <div className="DeleteRepoPopup_actionList">
                <MainButton className="DeleteRepoPopup_action" onClick={handleCancel}>cancel</MainButton>
                <MainButton className="DeleteRepoPopup_action" onClick={handleOk}>ok</MainButton>
            </div>
        </PopupWrapper>
    </PopupShadow>
}