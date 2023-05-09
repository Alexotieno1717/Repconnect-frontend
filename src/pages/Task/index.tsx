import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import axios, {AxiosResponse} from "axios";

const Task = () =>{
    // States
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getActivity = () => {

            console.log("Getting full url path", `${process.env.VITE_API_URL}/fetch-activities?rep_id=28`)
            console.log(import.meta.env.VITE_API_URL)
          axios.get(`${process.env.VITE_API_URL}/fetch-activities?rep_id=28`)
              .then((res :AxiosResponse) => {
                  console.log(res.data)
              }).catch((err) => {
                  console.log(err)
          })
        }

        getActivity();
    }, [])

    return (
        <>
            <Breadcrumb pageName='Task-Manager' />
            <div>Welcome Task Manager</div>

            {/*{tasks.map((item) => (*/}
            {/*    // <li key={item.id}>{item.activity_name}</li>*/}
            {/*))}*/}
        </>
    );
}

export default Task;