import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { rootStore } from "./store/rootStore";
import { Routes } from "./components/routes/Routes";
import "./style.css";

export function App(){
    return <Provider store={rootStore}>
        <>
            <Routes></Routes>
        </>
    </Provider>
}