import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import ModalStatus from "./ModalStatus";

const ComplaintSeller = ({ sellerInfo, closeModalHandler }) => {
  const [description, setDescription] = useState("");
  const [modalStatus, setmodalStatus] = useState("unsent");
  const [statusDescription, setStatusDescription] = useState("");
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [selectedComplaintID, setSelectedComplaintID] = useState(1);

  const getComplaintsCategories = async () => {
    const res = await fetch("http://localhost:3000/api/complaints/categories");
    const data = await res.json();
    setComplaintCategories(data != null ? data.data : []);
  };

  const sendComplaint = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || null)?.id;

    if (!userId) {
      alert("Usuario no autenticado");
      return;
    }

    setmodalStatus("loader");

    const res = await fetch("http://localhost:3000/api/users/complaint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        sellersId: sellerInfo.id,
        description: description,
        complaintCategoryID: selectedComplaintID,
      }),
    });

    const data = await res.json();

    setmodalStatus(data.isAdded || data.isUpdated ? "success" : "error");

    setStatusDescription(
      data.isAdded
        ? "Gracias por tu comentario, tu opinión es muy valiosa para nosotros."
        : data.isUpdated
        ? "Tu denuncia ha sido correctamente actualizada."
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

  useEffect(() => {
    getComplaintsCategories();
  }, []);

  const getInputConent = () => {
    return (
      <>
        <select
          className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          onChange={(evt) => setSelectedComplaintID(evt.target.value)}
        >
          <option value="" disabled>
            Categoría
          </option>
          {complaintCategories.map((category) => (
            <option
              key={category.cod_complaintcategories}
              value={category.cod_complaintcategories}
            >
              {category.nombre_category}
            </option>
          ))}
        </select>

        <textarea
          className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Cuéntanos tus observaciones."
          rows="4"
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
      <ModalStatus
        status={modalStatus}
        description={statusDescription}
        buttons={getCloseBtn()}
      />
    );
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        <h3 className="font-semibold text-lg">Cuéntanos acerca de</h3>
        <p className="font-semibold text-lg">
          {sellerInfo.first_name} {sellerInfo.last_name}
        </p>

        {modalStatus !== "unsent" && getStatusContent()}
        {modalStatus === "unsent" && getInputConent()}
      </div>
    </div>
  );
};

export default ComplaintSeller;
