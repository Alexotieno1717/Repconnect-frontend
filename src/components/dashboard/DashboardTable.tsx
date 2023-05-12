import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {useAuth} from "../../context/auth-context";
import Table from "../share-ui/table/Table";

const DashboardTable = () => {
    //Task State
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    // user state
    const { user } = useAuth();

    const currentDay = new Date().toISOString().slice(0, 10)

    useEffect(() => {
        const getActivity = () =>{
            // Axios fetch all users
            axios
                .get(`${process.env.VITE_API_URL}/fetch-activities?rep_id=${user?.client_id}&start_date=${currentDay}`)
                .then((res: AxiosResponse) => {
                    if(res.data.status === false) {
                        // ValidationAlert(response.data.status_message)
                    } else {
                        setTasks(res.data.activities)
                    }
                }).catch((err) => {
                    console.log(err)
            })
        }

        getActivity();
    })

    // Table
    const columns = [
        {

            Header: '#',
            accessor: '#',
            Cell: (x: { row: { index: number; }; }) =>{
                return (
                    <div>
                        {x.row.index + 1}
                    </div>
                )
            }
        },
        {
            Header: 'Activity Name',
            accessor: 'activity_name',
        },
        {
            Header: 'HCP Name',
            accessor: 'ambassador_name',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Product ID ',
            accessor: 'product_id',
        },
        {
            Header: "Status",
            accessor: "status",
        }
    ]

    return (
        <div>
            <Table columns={columns} data={tasks} loading={loading} />
        </div>
    );
};

export default DashboardTable;