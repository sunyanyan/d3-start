import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import Home from '../View/Home'
import BarChart from '../View/D3/QuickStart'
// import LineChart from '../View/D3/LineChart'
import BasicBarChart from '../View/D3/BasicBarChart'
import BasicAreaChart from '../View/D3/BasicAreaChart'
import BasicLineChart from '../View/D3/BasicLineChart'
import BasicBandChart from '../View/D3/BasicBandChart'
import BasicMutiLineChart from '../View/D3/BasicMutiLineChart'
import BasicStackedAreaChart from '../View/D3/BasicStackedAreaChart'
import BasicGroupedBarChart from '../View/D3/BasicGroupedBarChart'

export const D3RouteConfig = [
    { path: "/", component: Home, desc: "首页" },
    { path: "/quick-start", component: BarChart, desc: "快速开始" },
    { path: "/BasicBarChart", component: BasicBarChart, desc: "基础BarChart" },
    { path: "/BasicGroupedBarChart", component: BasicGroupedBarChart, desc: "基础GroupedBarChart" },
    { path: "/BasicAreaChart", component: BasicAreaChart, desc: "基础AreaChart" },
    { path: "/BasicLineChart", component: BasicLineChart, desc: "基础LineChart" },
    { path: "/BasicBandChart", component: BasicBandChart, desc: "基础BandChart" },
    { path: "/BasicMutiLineChart", component: BasicMutiLineChart, desc: "基础MutiLineChart" },
    { path: "/BasicStackedAreaChart", component: BasicStackedAreaChart, desc: "基础StackedAreaChart" },   
]



export const D3Route = ()=> {return (
    <Switch>
        { D3RouteConfig.map(value=>{
            return <Route exact path={value.path} key={value.path} component={value.component} />
        })}        
    </Switch>
)}
