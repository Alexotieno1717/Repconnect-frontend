// react toastify alert
import 'react-toastify/scss/main.scss';
import { toast, ToastContainer } from "react-toastify";
import {AxiosError} from "axios";

// toast
export const SuccessAlert = (message? : string) => {
    if (message) {

        toast.success(`${message}!  ✅`, {
            position: toast.POSITION.TOP_RIGHT
        });

    } else {

        toast.success("Successful ! ✅ 👏", {
            position: toast.POSITION.TOP_RIGHT
        });

    }
}

export const ValidationAlert = (message: string) => {
    toast.error(`${message}! 🛑`, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const ErrorAlert = (error : AxiosError) => {
    toast.error(`${error?.message}! 😞`, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const AlertContainer = () => ( <ToastContainer autoClose={5000}/> )