import React from 'react';
import {NavLink} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            Page Does Not Exits
            <NavLink to='/dashboard/home'>Go back to Home Page</NavLink>
        </div>
    );
};

export default PageNotFound;