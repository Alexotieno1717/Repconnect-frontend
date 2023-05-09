import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "./pages";
import Home from "./pages/home";
import Task from "./pages/Task";
import Expenses from "./pages/expenses";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import PageNotFound from "./pages/404";
import OTP from "./pages/Auth/Otp";

const CustomRoutes = () =>{
    return useRoutes([
        {
            path: '/',
            element: <Login />,
        },
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
        },
        {
            path: '/auth/login',
            element: <Login />,
        },
        {
            path: '/auth/signup',
            element: <Signup />
        },
        {
            path: '/otp',
            element: <OTP />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]);
}

export default CustomRoutes;