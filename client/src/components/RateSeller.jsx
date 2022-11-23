import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import CustomButton from "./CustomButton";
import { ClockLoader } from "react-spinners";

const RateSeller = ({
    sellerInfo,
    closeModalHandler,
    afterRateSellerHandler,
}) => {
    const [rateNumber, setRateNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(0);
    const [description, setDescription] = useState("");
    const [contentStatus, setContentStatus] = useState("unsent");
    const [statusDescription, setStatusDescription] = useState("");

    const getRateText = () => {
        switch (rateNumber || hoverStar) {
            case 0:
                return "Evaluar";
            case 1:
                return "Dissatifation";
            case 2:
                return "Unsatisfied";
            case 3:
                return "Normal";
            case 4:
                return "Satisfied";
            case 5:
                return "Very Satisfied";
            default:
                return "Evaluate";
        }
    };

    const handlePlaceHolder = () => {
        switch (rateNumber || hoverStar) {
            case 0:
                return "Comment here...";
            case 1:
            case 2:
            case 3:
            case 4:
                return "What is your problem?";
            case 5:
                return "Why do you like the product?";
            default:
                return "Comment here...";
        }
    };

    const rateSeller = async () => {
        const userId = JSON.parse(localStorage.getItem("user") || null)?.id;

        if (!userId) {
            alert("Usuario no autenticado");
            return;
        }

        setContentStatus("loader");

        const res = await fetch(`http://localhost:3000/api/users/rate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                sellersId: sellerInfo.id,
                rateNumber: rateNumber,
                description: description,
            }),
        });

        const data = await res.json();

        setContentStatus(
            data.isAdded
                ? "success"
                : data.isAlreadyExists
                ? "warning"
                : "error"
        );

        setStatusDescription(
            data.isAdded
                ? "Gracias por calificar a este vendedor, tu opinion es valiosa para nosotros."
                : data.isAlreadyExists
                ? "Lo sentimos, ya has calificado a este vendedor anteriormente."
                : data.error.message
        );

        afterRateSellerHandler();
    };

    const getCloseBtn = () => {
        return (
            <CustomButton
                className="bg-gray-300 text-black-600 hover:bg-gray-400/80"
                onClick={() => closeModalHandler(false)}
            >
                Cancelar
            </CustomButton>
        );
    };

    const getInputConent = () => {
        return (
            <>
                <div className="flex flex-col items-center gap-1">
                    <p>{getRateText()}</p>

                    <div className="flex gap-4">
                        {Array(5)
                            .fill()
                            .map((_, index) =>
                                rateNumber >= index + 1 ||
                                hoverStar >= index + 1 ? (
                                    <AiFillStar
                                        key={index}
                                        onMouseOver={() =>
                                            !rateNumber &&
                                            setHoverStar(index + 1)
                                        }
                                        onMouseLeave={() =>
                                            setHoverStar(undefined)
                                        }
                                        style={{
                                            color: "orange",
                                            transform: "scale(1.5)",
                                        }}
                                        onClick={() => setRateNumber(index + 1)}
                                    />
                                ) : (
                                    <AiOutlineStar
                                        key={index}
                                        onMouseOver={() =>
                                            !rateNumber &&
                                            setHoverStar(index + 1)
                                        }
                                        onMouseLeave={() =>
                                            setHoverStar(undefined)
                                        }
                                        style={{
                                            color: "orange",
                                            transform: "scale(1.5)",
                                        }}
                                        onClick={() => setRateNumber(index + 1)}
                                    />
                                )
                            )}
                    </div>
                </div>

                <textarea
                    className="border border-solid border-slate-400 rounded p-2"
                    placeholder={handlePlaceHolder()}
                    onChange={(evt) => setDescription(evt.target.value)}
                    value={description}
                />

                <div className="flex gap-5">
                    <CustomButton variant="secondary" onClick={rateSeller}>
                        Enviar
                    </CustomButton>
                    {getCloseBtn()}
                </div>
            </>
        );
    };

    const getStatusContent = () => {
        return (
            <div className="flex flex-col gap-10 items-center mt-6">
                {contentStatus === "success" ? (
                    <BsCheckCircleFill className="scale-[3] text-green-500" />
                ) : contentStatus === "warning" ? (
                    <MdError className="scale-[4] text-yellow-500" />
                ) : (
                    <MdError className="scale-[4] text-red-500" />
                )}

                <p className="text-center font-medium">{statusDescription}</p>

                {getCloseBtn()}
            </div>
        );
    };

    const getLoaderContent = () => {
        return <ClockLoader color="rgb(59, 130, 246)" />;
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-5">
                <h3 className="font-semibold text-lg">Califica a</h3>
                <p className="font-semibold text-lg">
                    {sellerInfo.first_name} {sellerInfo.last_name}
                </p>

                {contentStatus === "loader" && getLoaderContent()}

                {contentStatus == "unsent" && getInputConent()}

                {contentStatus != "unsent" &&
                    contentStatus != "loader" &&
                    getStatusContent()}
            </div>
        </div>
    );
};

export default RateSeller;
