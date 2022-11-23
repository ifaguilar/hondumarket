import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";
import { ClockLoader } from "react-spinners";
import CustomButton from "./CustomButton";

const ComplaintSeller = ({ sellerInfo, closeModalHandler }) => {
  const [description, setDescription] = useState("");
  const [contentStatus, setContentStatus] = useState("unsent");
  const [statusDescription, setStatusDescription] = useState("");

  const sendComplaint = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || null)?.id;

    if (!userId) {
      alert("Usuario no autenticado");
      return;
    }

    setContentStatus("loader");

    const res = await fetch("http://localhost:3000/api/users/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        sellersId: sellerInfo.id,
        description: description,
      }),
    });

    const data = await res.json();

    setContentStatus(
      data.isAdded ? "success" : data.isAlreadyExists ? "warning" : "error"
    );

    setStatusDescription(
      data.isAdded
        ? "Gracias por tu comentario, tu opinión es muy valiosa para nosotros."
        : data.isAlreadyExists
        ? "Lo sentimos, ya has denunciado a este vendedor anteriormente."
        : data.error.message
    );
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
        <textarea
          className="w-64 border border-solid border-slate-400 rounded p-2"
          placeholder="Cuéntanos tus observaciones."
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />

        <div className="flex gap-5">
          <CustomButton variant="primary" onClick={sendComplaint}>
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
        <h3 className="font-semibold text-lg">Cuéntanos acerca de</h3>
        <p className="font-semibold text-lg">
          {sellerInfo.first_name} {sellerInfo.last_name}
        </p>

        {contentStatus === "loader" && getLoaderContent()}

        {contentStatus === "unsent" && getInputConent()}

        {contentStatus != "unsent" &&
          contentStatus != "loader" &&
          getStatusContent()}
      </div>
    </div>
  );
};

export default ComplaintSeller;
