import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

function init(){
    const rootElement = document.querySelector('#root');
    const root = ReactDOM.createRoot(rootElement);
    const rootReactElement = React.createElement(App, {});
    root.render(rootReactElement);
}

init();
