import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { ClockLoader } from "react-spinners";

const ModalStatus = ({ status, description, buttons }) => {
    const getStatusResult = () => {
        return (
            <div className="flex flex-col gap-10 items-center mt-6">
                {status === "success" ? (
                    <BsCheckCircleFill className="scale-[3] text-green-500" />
                ) : status === "warning" ? (
                    <MdError className="scale-[4] text-yellow-500" />
                ) : (
                    <MdError className="scale-[4] text-red-500" />
                )}

                <p className="text-center font-medium">{description}</p>

                {buttons}
            </div>
        );
    };

    const getLoading = () => {
        return (
            <div className="flex flex-col items-center">
                <ClockLoader color="rgb(59, 130, 246)" />;
            </div>
        );
    };

    return (
        <>
            {status == "loading" && getLoading()}
            {status != "loading" && getStatusResult()}
        </>
    );
};

export default ModalStatus;
