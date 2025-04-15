import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/rootStore";
import { authGithubByPersonalToken } from "../../store/githubAuthSlice";
import { routesSlice } from "../../store/routesSlice";
import "./AuthPage.css";

export const AuthPage = ()=>{
    const [tokenValue, setTokenValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const {userInfo, authError, loading} = useAppSelector(state=>state.githubAuth);

    useEffect(()=>{
        if (userInfo){
            dispatch(routesSlice.actions.navigate('main'));
        }
    }, [userInfo]);

    return <div className="AuthPage">
        <div className="AuthPage_content_wrap">
            <div className="AuthPage_content">
                <div className="AuthPage_title">
                    Auth github
                </div>
                {userInfo && <div>{JSON.stringify(userInfo)}</div>}
                {authError && <div className="AuthPage_error">{authError}</div>}
                {loading && <div className="AuthPage_loading">loading...</div>}
                <form className="AuthPage_form" onSubmit={(e)=>{
                    e.preventDefault();
                    dispatch(authGithubByPersonalToken(tokenValue))
                }}>
                    <input className="AuthPage_input" value={tokenValue} onChange={(e)=>setTokenValue(e.target.value)} />
                    <button className="AuthPage_submit" type="submit">Auth</button>
                </form>
            </div>
        </div>
    </div>
}