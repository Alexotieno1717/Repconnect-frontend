import React from 'react';
import {BounceLoader} from "react-spinners";

const Spinner = () => {
    return (
        <div  className='h-screen flex items-center justify-center'>
            <BounceLoader color='#3C50E0' />
        </div>
    );
};

export default Spinner;