import React from 'react';
import {PulseLoader} from "react-spinners";

const PulseSpinner = () => {
    return (
        <div  className='flex items-center justify-center'>
            <PulseLoader color='#fff' />
        </div>
    );
};

export default PulseSpinner;