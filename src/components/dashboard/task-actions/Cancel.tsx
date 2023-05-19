import React, {Fragment, useState} from 'react';
import {user} from "../../../../types";
import {SuccessAlert, ValidationAlert} from "../../../utils/alerts";
import axios from "axios";
import {CANCELLED} from "../../../constant";
import {Dialog, Transition} from "@headlessui/react";
import PulseSpinner from "../../share-ui/spinners/PulseSpinner";

interface CancelProps {
    handleComplete: () => Promise<any>,
    taskSelected: any,
    loading: boolean,
    setLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    user: user | undefined,
    cancelShow: boolean,
    handleCancelClose: () => void
}

const Cancel = ({ handleComplete, taskSelected, loading, setLoading, user, cancelShow, handleCancelClose }: CancelProps) => {

    const [reason, setReason] = useState("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setLoading(true);

        // @ts-ignore
        const params = new URLSearchParams({
            activity: taskSelected.activity_name,
            rep_id: user?.client_id,
            ambassador_id: taskSelected.ambassador_id,
            location: taskSelected.location,
            notes: reason,
            scheduled_date: taskSelected.scheduled_date,
            id: taskSelected.id,
            status: CANCELLED,
        });

        axios.post(`${process.env.VITE_API_URL}/update-activity?${params}`)
            .then((response) => {
                console.log(response.data)
                if (response.data.status === false) {
                    ValidationAlert(response.data.status_message);
                } else {
                    // Alert Message success
                    SuccessAlert(response.data.status_message);

                    // Closing modal trigger
                    handleCancelClose()
                }
                setLoading(false);
            }).catch((error) => {
            console.log(error)
            setLoading(false);
        })
    }

    
    return (
        <div>
            <Transition appear show={cancelShow} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleCancelClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-[3px_3px_5px_rgba(28,36,52,.4)] transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-black"
                                    >
                                        Cancel Task
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        {/* Form goes here... */}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="mb-2.5 block text-black" htmlFor="email">
                                                    Reason:
                                                </label>
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                    type="text"
                                                    placeholder="Enter your Reason..."
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  setReason(event.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                            onClick={handleCancelClose}
                                            disabled={loading}
                                        >
                                            {loading ? <PulseSpinner /> : 'Close'}
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 ml-4 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? <PulseSpinner /> : 'Submit'}

                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>
    );
};

export default Cancel;