import React, {ReactNode, useState} from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface DefaultLayoutProps{
    children: ReactNode;
}
const DefaultLayout = ({children}: DefaultLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
        {/*  Page wrapper start  */}
            <div className="flex h-screen overflow-hidden">
                {/*  Sidebar start  */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* Content Area Start   */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/*  Navbar start  */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    {/*  Navbar end  */}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;