import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../View/Home'
import BarChart from '../View/D3/QuickStart'
import LineChart from '../View/D3/LineChart'

export const D3RouteConfig = [
    { path: "/", component: Home, desc: "首页" },
    { path: "/quick-start", component: BarChart, desc: "快速开始" },
    { path: "/line-chart", component: LineChart, desc: "线形图" },
]

export const D3Route = ()=> {return (
    <Switch>
        { D3RouteConfig.map(value=>{
            return <Route exact path={value.path} component={value.component} />
        })}        
    </Switch>
)}
