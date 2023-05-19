import React, {useEffect, useRef, useState} from "react";
import {ArrowTrendingUpIcon, BookmarkIcon, CheckBadgeIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import {useAuth} from "../../context/auth-context";
import { COMPLETED, REVISIT } from '../../constant';


// @ts-ignore
function DashboardStatus() {

    const [revisitsStatus, setRevisitsStatus] = useState({})
    const [completeStatus, setCompleteStatus] = useState({})
    const [totalExpenses, setTotalExpenses] = useState('');

    const { user } = useAuth();

    const currentDay = new Date().toISOString().slice(0, 10)

    const getRevisitTasks = () => {
        // Axios Fetch total Revisits

        // @ts-ignore
        const params = new URLSearchParams({
            rep_id: user?.client_id,
            start_date: currentDay,
            task_status: REVISIT
        }).toString()
        axios.get(`${process.env.REACT_APP_API_URL}/filter-task-status?${params}`)
            .then((res) => {
                if(res.data.status === true) {
                    console.log('getting revisits', res.data)
                    setRevisitsStatus(res.data.data)

                }
            }).catch((err) => {
            console.log(err);
        })
    }
    const getCompletedTasks = () => {
        // Axios Fetch total Complete Task

        // @ts-ignore
        const params = new URLSearchParams({
            rep_id: user?.client_id,
            start_date: currentDay,
            task_status: COMPLETED
        }).toString()
        axios.get(`${process.env.REACT_APP_API_URL}/filter-task-status?${params}`)
            .then((res) => {
                // console.log('getting completed tasks', res.data)
                if(res.data.status === true) {
                    // console.log('getting revisits', res.data)
                    setCompleteStatus(res.data.data)
                }

            }).catch((err) => {
            console.log(err);
        })
    }

    // Getting total Expenses
    const getTotalExpenses = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/total-expenses?rep_id=${user?.client_id}`)
            .then((response) => {
                // console.log(response.data)
                if(response.data.status === true) {
                    setTotalExpenses(response.data.total_expenses)

                }
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCompletedTasks();
        getTotalExpenses();
        getRevisitTasks();
    }, [])

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className=" p-3 rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                <div className="flex justify-between mb-4">
                    <div>
                        <p className=" text-meta-4 pt-3">
                            Daily Expenses
                        </p>
                        <p className="text-xl font-bold pt-2">{totalExpenses ? totalExpenses : '0'}</p>
                    </div>
                    <div className="w-12 h-12 text-white flex items-center justify-center bg-primary rounded-full">
                        <ArrowTrendingUpIcon className="rounded w-6 h-6 text-center" />
                    </div>
                </div>
            </div>

            {/*  Second Card  */}
            <div className=" p-3 rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                <div className="flex justify-between mb-4">
                    <div>
                        <p className=" text-meta-4 pt-3">
                            Today's Revisits
                        </p>
                        <p className="text-xl font-bold pt-2">{revisitsStatus?.total_activities || '0'}</p>
                    </div>
                    <div className="w-12 h-12 text-white flex items-center justify-center bg-success rounded-full">
                        <BookmarkIcon className="rounded w-6 h-6 text-center" />
                    </div>
                </div>
            </div>

            {/*  Third Card  */}
            <div className=" p-3 rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                <div className="flex justify-between mb-4">
                    <div>
                        <p className=" text-meta-4 pt-3">
                            Completed Task
                        </p>
                        <p className="text-xl font-bold pt-2">{completeStatus?.total_activities || '0'}</p>
                    </div>
                    <div className="w-12 h-12 text-white flex items-center justify-center bg-danger rounded-full">
                        <CheckBadgeIcon className="rounded w-6 h-6 text-center" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardStatus;