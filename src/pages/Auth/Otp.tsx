import axios from 'axios';
import React, { useState } from 'react'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { ErrorAlert, SuccessAlert, ValidationAlert } from '../../utils/alerts';
// @ts-ignore
import OTPInput from '../../components/share-ui/form/OTPInput.jsx';
import OtpImg from '../../assets/images/otp.jpg';

function OTP() {

    // location
    const location = useLocation()

    // get data from url
    const data = (location.state ? location.state : null)

    // user context
    const { setUser } = useAuth()

    // otp input
    const [otp, setOtp] = useState('')

    //loading state
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // if there's no client navigate back to log in
    if (!data) {
        return <Navigate to={'/auth/login'} replace />;
    }

    // onsubmit function
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        // Set loading state to true
        setLoading(true);

        const number = data.data.msisdn.replace('+', '')

        const params = new URLSearchParams({
            totp: otp,
            phone: number
        }).toString()

        axios
            .get(`${process.env.VITE_API_URL}/verify-otp?${params}`)
            .then((response) => {
                if(response.data.status === false) {
                    // turn off loading
                    setLoading(false);

                    // set validation alert
                    ValidationAlert(response.data.status_message)

                } else {
                    // turn off loading
                    setLoading(false);

                    // show success alert
                    SuccessAlert();

                    const userToSave = {
                        client_id: data.data.id,
                        names: data.data.names,
                        email: data.data.email,
                        msisdn: data.data.msisdn,
                        username: data.data.username,
                    }
                    // set user
                    setUser(userToSave)

                    // save on localstorage
                    localStorage.setItem('user', JSON.stringify(userToSave))

                    // direct to dashboard
                    navigate('/dashboard/home');

                }
            })
            // catch errors
            .catch((err) => {
                // turn off loading
                setLoading(false);
                ErrorAlert(err)
            });
    }


    return (
        <div className='bg-white'>
            <section className="w-full flex flex-row">
                <div className="2xsm:hidden md:block xl:w-1/2">
                    <img src={OtpImg} alt="otp" />
                </div>

                {/* Form Start */}
                <div className="2xsm:pl-10 xl:pl-0 xl:w-1/2 text-center pt-34">
                    <h4 className='font-semibold text-3xl pb-3.5'>One Time Password</h4>
                    <p className="font-normal">Enter The OTP You Have Received On Your Phone</p>
                    <h4 className='py-4 font-bold text-primary'>{data.data.msisdn}</h4>
                    <form className="form-auth" onSubmit={(event) => onSubmitHandler(event)}>
                        {/* otp input */}
                        <div className="">
                            <OTPInput
                                autoFocus
                                length={4}
                                onChangeOTP={(otp: React.SetStateAction<string>) => setOtp(otp)}
                                className=" flex xl:ml-45 otpContainer"
                                inputClassName="otpInput"
                                placeholder="."
                            />
                        </div>
                        {/* submit button */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-75"
                        >
                            {loading ? 'loading...' : 'Submit'}
                        </button>
                        {/* link to sign in */}
                        <div className="mt-5 text-center">
                            Have An Account? <Link to="/" className="text-primary underline italic">Click Here To Sign In</Link>
                        </div>
                    </form>
                </div>
                {/* Form End */}
            </section>
        </div>
    )
}

export default OTP