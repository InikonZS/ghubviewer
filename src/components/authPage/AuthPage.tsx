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
        <div>
            Auth github
        </div>
        {userInfo && <div>{JSON.stringify(userInfo)}</div>}
        {authError &&  <div>{authError}</div>}
        {loading && <div>loading...</div>}
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                dispatch(authGithubByPersonalToken(tokenValue))
            }}>
                <input value={tokenValue} onChange={(e)=>setTokenValue(e.target.value)} />
                <button type="submit">Auth</button>
            </form>
        </div>
    </div>
}