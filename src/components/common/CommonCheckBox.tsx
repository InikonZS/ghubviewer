import React from "react";
import './CommonCheckBox.css';

interface ICheckBoxProps{
    checked: boolean;
    onCheck: (next: boolean)=>void;
    label: React.ReactNode
}

export const CheckBox = ({checked, onCheck, label}: ICheckBoxProps)=>{
    return <div className={`CommonCheckbox ${checked ? 'CommonCheckbox--checked': ''}`} onClick={()=>onCheck(!checked)}>
        {label}
        <div className="CommonCheckbox_box">
            <div className="CommonCheckbox_check">
            
            </div>
        </div>  
    </div>
}