import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { ClockLoader } from "react-spinners";
import CustomButton from "./CustomButton";
import ModalStatus from "./ModalStatus";

const RateSeller = ({
  sellerInfo,
  closeModalHandler,
  afterRateSellerHandler,
}) => {
  const [rateNumber, setRateNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [description, setDescription] = useState("");
  const [modalStatus, setmodalStatus] = useState("unsent");
  const [statusDescription, setStatusDescription] = useState("");

  const getRateText = () => {
    switch (rateNumber || hoverStar) {
      case 0:
        return "Evaluar";
      case 1:
        return "Muy Insatisfecho";
      case 2:
        return "Insatisfecho";
      case 3:
        return "Normal";
      case 4:
        return "Satisfecho";
      case 5:
        return "Muy satisfecho";
      default:
        return "Evaluar";
    }
  };

  const handlePlaceHolder = () => {
    switch (rateNumber || hoverStar) {
      case 0:
        return "Agrega un comentario...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "¿Cuál es su problema?";
      case 5:
        return "¿Por qué le gusta el producto?";
      default:
        return "Agrega un comentario...";
    }
  };

  const rateSeller = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || null)?.id;

    if (!userId) {
      alert("Usuario no autenticado");
      return;
    }

    setmodalStatus("loader");

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

    setmodalStatus(
      data.isAdded || data.isUpdated ? "success" : "error"
    );

    setStatusDescription(
      data.isAdded
        ? "Gracias por calificar a este vendedor, tu opinion es muy valiosa para nosotros."
        : data.isUpdated
        ? "Su calificacion ha sido correctamente actualizada"
        : data.error.message
    );

    afterRateSellerHandler();
  };

  const getCloseBtn = () => {
    return (
      <CustomButton
        variant="secondary"
        onClick={() => closeModalHandler(false)}
      >
        Cerrar
      </CustomButton>
    );
  };

  const getInputConent = () => {
    return (
      <>
        <div className="flex flex-col items-center gap-1">
          <p>{getRateText()}</p>

          <div className="flex gap-4 mt-4">
            {Array(5)
              .fill()
              .map((_, index) =>
                rateNumber >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    key={index}
                    onMouseOver={() => !rateNumber && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{
                      color: "orange",
                      transform: "scale(1.5)",
                    }}
                    onClick={() => setRateNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    key={index}
                    onMouseOver={() => !rateNumber && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
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
			className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder={handlePlaceHolder()}
			rows="4"
			onChange={(evt) => setDescription(evt.target.value)}
			value={description}
        />

        <div className="flex gap-5">
          <CustomButton variant="primary" onClick={rateSeller}>
            Enviar
          </CustomButton>
          {getCloseBtn()}
        </div>
      </>
    );
  };

  const getStatusContent = () => {
	return (
		<ModalStatus
			status={modalStatus}
			description={statusDescription}
			buttons={getCloseBtn()}
		/>
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

        {modalStatus === "loader" && getLoaderContent()}

        {modalStatus == "unsent" && getInputConent()}

        {modalStatus != "unsent" &&
          modalStatus != "loader" &&
          getStatusContent()}
      </div>
    </div>
  );
};

export default RateSeller;
