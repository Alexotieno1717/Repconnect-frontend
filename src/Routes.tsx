import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "./pages";
import Home from "./pages/home";
import Task from "./pages/Task";

const CustomRoutes = () =>{
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                {
                    path: 'home',
                    element: <Home />
                },
                {
                    path: 'task-manager',
                    element: <Task />
                }
            ]
        }
    ])

    return routes;
}

export default CustomRoutes;