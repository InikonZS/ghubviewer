import React from "react"
import "./EditRepoPopup.css";

interface IEditRepoPopupProps{
    onClose: ()=>void,
    onSave: (data: any)=>void
}

export const EditRepoPopup = ({onClose, onSave}: IEditRepoPopupProps)=>{
    return <div className="EditRepoPopup">
        <button onClick={()=>onClose()}>close</button>
        <button onClick={()=>onSave({})}>save</button>
    </div>
}