import React, {useEffect, useState} from 'react';
import {useAuth} from "../../context/auth-context";
import Table from "../share-ui/table/Table";
import {useQuery} from "@tanstack/react-query";
import EmptyStateImg from "../../assets/images/empty.svg";
import Cancel from "./task-actions/Cancel";
import axios from "axios";
import {useGeolocated} from "react-geolocated";
import Complete from "./task-actions/Complete";
import Revisits from "./task-actions/Revisits";

const DashboardTable = () => {

    const { coords, getPosition, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
        suppressLocationOnMount: true,
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [taskSelected, setTaskSelected] = useState();
    const [show, setShow] = useState<boolean>(false);
    const [cancelShow, setCancelShow] = useState<boolean>(false);
    const [completeShow, setCompleteShow] = useState<boolean>(false);

    // Revisits modal trigger
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Cancel modal trigger
    const handleCancelClose = () => setCancelShow(false);
    const handleCancelShow = () => setCancelShow(true);

    // Complete modal trigger
    const handleCompleteClose = () => setCompleteShow(false);
    const handleCompleteShow = () => setCompleteShow(true);

    // user state
    const { user } = useAuth();

    const currentDay = new Date().toISOString().slice(0, 10)

    // Fetching All Activity
    const  { isError, isLoading, data } = useQuery({
        queryKey: ['activity'],
        queryFn: () =>
            fetch(`${process.env.VITE_API_URL}/fetch-activities?rep_id=${user?.client_id}&start_date=${currentDay}`)
                .then((res) => res.json()),
        refetchInterval: 5000,

    })

    // Background color for buttons
    const getButtonColor = (status: string) => {
        switch (status) {
            case 'disapproved':
                return "bg-secondary";

            case 'completed':
                return "bg-success";

            case 'cancelled':
                return "bg-danger";

            case 'revisit':
                return "bg-primary";

            default:
                return "bg-black";
        }
    }

    const chooseStatusType = (data: any) => {
        setTaskSelected(data)
        getPosition()
    }

    // Choose status type without position
    const chooseStatusTypeWithoutPosition = (data: any) => {
        setTaskSelected(data)
    }

    const handleComplete = async () => {

        let response;

        getPosition()

        setLoading(true)
        if (isGeolocationEnabled && isGeolocationAvailable) {

            response = await axios.get(`${process.env.VITE_API_URL}/verify-locale?rep_id=${user?.client_id}&activity_id=${taskSelected?.id}&lat=${coords.latitude}&long=${coords.longitude}`)
        } else {
            getPosition()
            setLoading(false)

        }
        return response
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
            Header: "Status",
            accessor: "status",
            Cell : (x: { row: { original: { status: string }; }; }) =>{
                return (
                    <div className='relative'>
                        <button
                            className={`overflow-hidden flex justify-center items-center text-white px-3 py-2 text-xs font-medium text-center rounded-lg hover:cursor-pointer ${getButtonColor(x.row.original.status)}`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {x.row.original.status.charAt(0).toUpperCase() + x.row.original.status.slice(1).toLowerCase()}
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        <div
                            className={ `${dropdownOpen ? 'opacity-100 visible' : ' invisible opacity-0'} absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none` }
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                            <div className="py-1" role="none">
                                <li
                                   className="text-black block px-4 py-2 text-sm cursor-pointer" role="menuitem"
                                   tabIndex={-1} id="menu-item-0"
                                    onClick={() => {
                                        chooseStatusTypeWithoutPosition(x.row.original)
                                        console.log(x.row.original)
                                    }}
                                >
                                    <span onClick={handleShow}>
                                        Revisits
                                    </span>
                                </li>

                                <li className="text-black block px-4 py-2 text-sm cursor-pointer" role="menuitem"
                                   tabIndex={-1} id="menu-item-1"
                                    onClick={() => chooseStatusType(x.row.original)}
                                >
                                    <span
                                        onClick={handleCompleteShow}
                                    >
                                        Complete
                                    </span>
                                </li>

                                <li className="text-black block px-4 py-2 text-sm cursor-pointer" role="menuitem"
                                   tabIndex={-1} id="menu-item-2"
                                   onClick={() => {
                                       chooseStatusTypeWithoutPosition(x.row.original)
                                       console.log(x.row.original)
                                   }}
                                ><span
                                    onClick={handleCancelShow}
                                >
                                    Cancel
                                </span></li>
                            </div>
                        </div>

                    </div>
                )
            }
        }
    ]

    return (
        <div>

            {isLoading ?
                (
                    <>
                        <p>Loading data.......</p>
                    </>
                ) : (
                    <>
                        {!isLoading && isError ? (
                                <div>
                                    <div className='p-4 text-3xl text-black text-center opacity-6'>{data.status_message}</div>
                                    <img src={EmptyStateImg} className='w-100 m-auto' alt="Empty Svg"/>
                                </div>
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
                            )
                        }
                    </>
                )
            }

            {/*  MODALS  */}
            {/* Cancel Modal */}
            <Cancel
                handleComplete={handleComplete}
                taskSelected={taskSelected}
                loading={loading}
                setLoading={setLoading}
                user={user}
                cancelShow={cancelShow}
                handleCancelClose={handleCancelClose}
            />
            {/*  Complete Modal  */}
            <Complete
                handleComplete={handleComplete}
                taskSelected={taskSelected}
                loading={loading}
                setLoading={setLoading}
                user={user}
                completeShow={completeShow}
                handleCompleteClose={handleCompleteClose}
            />
            {/*  Revisits  */}
            <Revisits
                handleComplete={handleComplete}
                taskSelected={taskSelected}
                loading={loading}
                setLoading={setLoading}
                user={user}
                show={show}
                handleClose={handleClose}
            />
        </div>
    );
};

export default DashboardTable;