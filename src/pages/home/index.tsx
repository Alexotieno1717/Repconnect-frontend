import React, {useEffect, useRef, useState} from 'react';
import {
    ArrowTrendingUpIcon,
    BookmarkIcon,
    CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import Breadcrumb from "../../components/Breadcrumb";
import DashboardTable from "../../components/dashboard/DashboardTable";
import DashboardStatus from "../../components/dashboard/DashboardStatus";
import {Link} from "react-router-dom";
import UserOne from "../../assets/images/faces/face1.jpg";

const Home = () =>{

    return (
        <div>
            <div className="pt-0 rounded-lg">
                <Breadcrumb pageName='Dashboard' />
                <DashboardStatus />
            </div>
            <div className=" p-4 bg-white rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                <DashboardTable />
            </div>
        </div>
    );
}

export default Home;