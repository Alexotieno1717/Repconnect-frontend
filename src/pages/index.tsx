import React from 'react';
import DefaultLayout from "../layout/DefaultLayout";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <DefaultLayout>
            {/*  Main Content Start  */}
            <main>
                <div className="mx-auto max-w-screen-2xl p-4 2xl:p-10">
                    <Outlet />
                </div>
            </main>
            {/*  Main Content Start  */}

        </DefaultLayout>
    );
}

export default Dashboard;