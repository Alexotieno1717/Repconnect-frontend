import React from 'react';
import {
    ArrowTrendingUpIcon,
    BookmarkIcon,
    CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import Breadcrumb from "../../components/Breadcrumb";
import Table from "../../components/share-ui/table/Table";

const Home = () =>{
    return (
        <div>
            <div className="pt-0 rounded-lg">
                <Breadcrumb pageName='Dashboard' />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className=" p-3 rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className=" text-meta-4 pt-3">
                                    Daily Expenses
                                </p>
                                <p className="text-xl font-bold pt-2">500</p>
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
                                <p className="text-xl font-bold pt-2">50</p>
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
                                <p className="text-xl font-bold pt-2">0</p>
                            </div>
                            <div className="w-12 h-12 text-white flex items-center justify-center bg-danger rounded-full">
                                <CheckBadgeIcon className="rounded w-6 h-6 text-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" p-4 bg-white rounded-xl shadow-[1px_1px_3px_rgba(28,36,52,.4)]">
                {/*<Table />*/}
            </div>

        </div>
    );
}

export default Home;