import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import axios, {AxiosResponse} from "axios";
import {useQuery} from "@tanstack/react-query";
import Table from "../../components/share-ui/table/Table";
import {EyeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid";

const Task = () =>{
    // States
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)

    // Fetching All Activity
    const  { isError, isLoading, data } = useQuery({
        queryKey: ['activity'],
        queryFn: () =>
            fetch(`${process.env.VITE_API_URL}/fetch-activities?rep_id=28`)
                .then((res) => res.json()),
        refetchInterval: 5000,
    })

    if(!isLoading) {
        console.log(data)
        return <div className='p-4 text-3xl text-black text-center opacity-6'>{data.status_message}</div>;
    }

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
            Header: "Action",
            accessor: "action",
            Cell: (cell: any) => {
                return (
                    <div className='flex space-x-1'>
                        <div
                            className='h-5 w-5 text-primary'

                            onClick={() => {
                                console.log(cell.row.original.id);
                            }}
                        >
                         <EyeIcon  />
                        </div>

                        {/* Edit Icon */}
                        <div

                            onClick={() => {
                                console.log(cell.row.original.id);
                            }}
                        >
                            <PencilSquareIcon className='h-5 w-5 text-success' />
                        </div>

                        {/* Delete Icon */}
                        <div

                            onClick={() => {
                                console.log(cell.row.original.id);
                            }}
                        >
                            <TrashIcon className='h-5 w-5 text-danger' />
                        </div>

                    </div>
                )
            }
        }
    ]


    return (
        <>
            <Breadcrumb pageName='Task-Manager' />
            <div>Welcome Task Manager</div>

            {isLoading ? (
                "Loading data......."
            ) : (
                <>
                    <div>
                        <Table
                            columns={columns}
                            data={data?.activities}
                            loading={loading}
                        />
                    </div>
                </>
            )}

            {/*{data.map((item) => (*/}
            {/*    <li key={item.id}>{item.activity_name}</li>*/}
            {/*))}*/}
        </>
    );
}

export default Task;