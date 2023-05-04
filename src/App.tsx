import React, { useState } from 'react'
import './App.css'
import Sidebar from "./components/Sidebar";
import {BrowserRouter} from "react-router-dom";
import CustomRoutes from "./Routes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
        <CustomRoutes />
    </BrowserRouter>
  )
}

export default App
