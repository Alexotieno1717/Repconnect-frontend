import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter} from "react-router-dom";
import CustomRoutes from "./Routes";
import {AuthContext} from "./context/auth-context";
import {user} from "../types";
import {ToastContainer} from "react-toastify";
import Spinner from "./components/share-ui/spinners/Spinner";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    // set user
    const [ user, setUser ] = useState<user>()
    // spinner
    const [ spinner, setSpinner ] = useState(true);

    const setCurrentUser = (data: user)=> {
        setUser(data)
    }

    useEffect(() => {
        // check for user in local storage
        // @ts-ignore
        const userFromJson = JSON.parse(localStorage.getItem('user'))

        // set user if exists in local storage
        if(userFromJson) {
            // set user
            setUser(userFromJson)
        }

        // preloading
        setTimeout(()=> setSpinner(false), 2000);

    },[])

    // preloading
    if(spinner) {
        return <Spinner />
    }

  return (
      <AuthContext.Provider value={{ user, setUser: setCurrentUser }} >
          {/* React Toastify */}
          <ToastContainer limit={1}/>
          <BrowserRouter>
              <CustomRoutes />
          </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App
