import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "./pages";
import Home from "./pages/home";
import Task from "./pages/Task";
import Expenses from "./pages/expenses";

const CustomRoutes = () =>{
    return useRoutes([
        {
            path: '/dashboard',
            element: <Dashboard/>,
            children: [
                {
                    path: 'home',
                    element: <Home/>,
                },
                {
                    path: 'task-manager',
                    element: <Task/>,
                },
                {
                    path: 'expenses',
                    element: <Expenses/>,
                },
            ]
        }
    ]);
}

export default CustomRoutes;