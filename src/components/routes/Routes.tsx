import React from "react"
import { AuthPage } from "../authPage/AuthPage"
import { MainPage } from "../mainPage/MainPage"
import { useAppSelector } from "../../store/rootStore";

export const Routes = ()=>{
    const pageName = useAppSelector(state=>state.routes.page);
    const routes = {
        'main': MainPage,
        'auth': AuthPage
    }
    const PageComponent = routes[pageName as keyof typeof routes] || (()=><div>404</div>);
    return <>
        <PageComponent></PageComponent>
    </>
}