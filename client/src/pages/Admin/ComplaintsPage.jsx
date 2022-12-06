import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import CustomButton from "../../components/CustomButton";
import Modal from "../../components/Modal";
import ModalStatus from "../../components/ModalStatus";
import Pagination from "../../components/Pagination";
import SwitchOnOff from "../../components/SwitchOnOff";

const ComplaintsPage = () => {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemsPerPage, setItemsPerPage] = useState(10);
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [refresh, setRefesh] = useState(false);
  const [modalStatus, setModalStatus] = useState("unsent");
  const [modalDescription, setModalDescription] = useState("");
  const [searchText, setsearchText] = useState("");

  const fetchComplaints = async (filter = "all") => {
    const response = await fetch(
      `http://localhost:3000/api/complaints/all${
        filter != "all" ? "/?filter=" + filter : ""
      }`
    );
    const data = await response.json();

    setComplaints(data);
    setFilteredComplaints(data);
  };

  const getComplaintsCategories = async () => {
    const res = await fetch("http://localhost:3000/api/complaints/categories");
    const data = await res.json();
    setComplaintCategories(data != null ? data.data : []);
  };

  const changeComplaintStatus = async (evt) => {
    setModalStatus("loading");

    const response = await fetch(
      "http://localhost:3000/api/complaints/changeComplaintStatus",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: !selectedComplaint.is_active,
          userID: selectedComplaint.reviewer_id,
          sellerID: selectedComplaint.person_id,
        }),
      }
    );

    const data = await response.json();

    setModalStatus(data.isChanged ? "success" : "error");

    setModalDescription(
      data.isChanged
        ? "Se ha actualizado el estado de la denuncia."
        : data.error.message
    );

    setRefesh((prevState) => !prevState);
  };

  const onChangeSearcher = (evt) => {
    const value = evt.target.value;
    setsearchText(value);

    if (!value) setFilteredComplaints(complaints);

    const filteredComplaints = complaints.filter((complaint) =>
      complaint.description
        .toLocaleLowerCase()
        .includes(value.toLocaleLowerCase())
    );

    setFilteredComplaints(filteredComplaints);
  };

  useEffect(() => {
    getComplaintsCategories();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [refresh]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const getPageContent = () => {
    if (loading) {
      return (
        <div className="flex align-center justify-center">
          <PuffLoader color={"#3B82F6"} />
        </div>
      );
    } else {
      return (
        <div className="p-12 bg-white rounded-lg shadow">
          <div>
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold">Denuncias</h2>
              <div className="flex gap-5">
                <select
                  className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(evt) => fetchComplaints(evt.target.value)}
                >
                  <option value="all">Todas</option>
                  {complaintCategories.map((category) => (
                    <option key={category.cod_complaintcategories}>
                      {category.nombre_category}
                    </option>
                  ))}
                </select>
                <label>
                  Buscar:{" "}
                  <input
                    type="text"
                    className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar denuncias por descripción..."
                    value={searchText}
                    onChange={onChangeSearcher}
                  />
                </label>
              </div>
            </div>
            <p className="mt-4">
              Administración de todas las denuncias de la plataforma.
            </p>
          </div>

          <div className="flex flex-col gap-12 mt-12">
            {filteredComplaints.length !== 0 ? (
              <div className="flex gap-4 items-center">
                <p className="font-semibold w-6">#</p>
                <p className="font-semibold w-96">Descripcion</p>
                <p className="font-semibold w-96">Categoria</p>
                <p className="font-semibold w-96">Denunciado</p>
                <p className="font-semibold w-96">Fecha y hora de creación</p>
                <p className="font-semibold w-96">
                  Fecha y hora de última modificación
                </p>
                <p className="font-semibold w-16">¿Activa?</p>
              </div>
            ) : null}
            {filteredComplaints.length !== 0 ? (
              filteredComplaints.map((complaint, idx) => (
                <div key={complaint.id} className="flex gap-4 items-center">
                  <p className="w-6">{idx + 1}</p>
                  <p className="w-96 break-all">{complaint.description}</p>
                  <p className="w-96">{complaint.nombre_category}</p>
                  <p className="w-96 break-all">
                    {complaint.first_name} {complaint.last_name}
                  </p>
                  <p className="w-96">
                    {new Intl.DateTimeFormat("es-HN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: true,
                    }).format(new Date(complaint.created_at))}
                  </p>
                  <p className="w-96">
                    {new Intl.DateTimeFormat("es-HN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: true,
                    }).format(new Date(complaint.modified_at))}
                  </p>

                  <div className="w-16">
                    <SwitchOnOff
                      isOn={complaint.is_active}
                      value=""
                      onChange={() => {
                        setSelectedComplaint(complaint);
                        setModalStatus("unsent");
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron denuncias.</p>
            )}
          </div>
          <div className="mt-8">
            <Pagination
              totalProducts={filteredComplaints.length}
              productsPerPage={ItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      );
    }
  };

  const getModalCloseBtn = (text = "Cerrar") => {
    return (
      <CustomButton variant="secondary" onClick={() => setOpenModal(false)}>
        {text}
      </CustomButton>
    );
  };

  const getModalContent = () => {
    return (
      <>
        <h1 className="text-center">
          ¿Estás seguro de que quieres{" "}
          <span className="font-semibold">
            {selectedComplaint.is_active ? "desactivar" : "activar"}
          </span>{" "}
          {""}
          esta denuncia?
        </h1>

        {/* <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p>
                            <span className="font-semibold">Denunciado:</span>{" "}
                            {selectedComplaint.first_name}{" "}
                            {selectedComplaint.last_name}
                        </p>
                        <p>
                            <span className="font-semibold">Descripción:</span>{" "}
                            {selectedComplaint.description}
                        </p>
                    </div>
                </div> */}

        <div className="flex gap-5 justify-center">
          <CustomButton
            type="button"
            variant="danger"
            onClick={changeComplaintStatus}
          >
            Confirmar
          </CustomButton>
          {getModalCloseBtn("Cancelar")}
        </div>
      </>
    );
  };

  const getModalStatus = () => {
    return (
      <ModalStatus
        status={modalStatus}
        description={modalDescription}
        buttons={getModalCloseBtn()}
      />
    );
  };

  return (
    <>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        <div className="flex flex-col justify-center items-center h-5/6 gap-5">
          {modalStatus !== "unsent" && getModalStatus()}
          {modalStatus === "unsent" && getModalContent()}
        </div>
      </Modal>
      <div className="container mx-auto mt-16 py-16 min-h-screen">
        {getPageContent()}
      </div>
    </>
  );
};

export default ComplaintsPage;
