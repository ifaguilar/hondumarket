import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import CustomButton from "../../components/CustomButton";
import Modal from "../../components/Modal";
import ModalStatus from "../../components/ModalStatus";
import Pagination from "../../components/Pagination";
import SwitchOnOff from "../../components/SwitchOnOff";

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState({});
  const [refresh, setRefesh] = useState(false);
  const [modalStatus, setModalStatus] = useState("unsent");
  const [modalDescription, setModalDescription] = useState("");
  const [searchText, setsearchText] = useState("");

  const fetchUsers = async () => {
    const response = await fetch(
      "http://localhost:3000/api/users/?state=includeInactive"
    );
    const data = await response.json();

    const noAdminUser = data.users.filter((user) => user.role_id === 2);

    setUsers(noAdminUser);
    setFilteredUsers(noAdminUser);
  };

  const changeUserStatus = async (evt) => {
    setModalStatus("loading");

    const response = await fetch(
      "http://localhost:3000/api/users/changeStatus",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: !selectedUser.is_active,
          userID: selectedUser.id,
        }),
      }
    );

    const data = await response.json();

    setModalStatus(data.isChanged ? "success" : "error");

    setModalDescription(
      data.isChanged
        ? "Se ha actualizado el estado del usuario."
        : data.error.message
    );

    setRefesh((prevState) => !prevState);
  };

  const onChangeSearcher = (evt) => {
    const value = evt.target.value;
    setsearchText(value);

    if (!value) setFilteredUsers(users);

    const filteredUsers = users.filter((user) => {
      const userName = user.first_name + " " + user.last_name;
      return userName.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });

    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUsers();
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
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Usuarios</h2>
            <label>
              Buscar:{" "}
              <input
                type="text"
                className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar usuarios por nombre"
                value={searchText}
                onChange={onChangeSearcher}
              />
            </label>
          </div>
          <p className="mt-4">
            Administración de todas los usuarios de la plataforma.
          </p>
          <div className="flex flex-col gap-12 mt-12">
            {filteredUsers.length !== 0 ? (
              <div className="flex gap-4 items-center">
                <p className="font-semibold w-6">#</p>
                <p className="font-semibold w-96">Nombre</p>
                <p className="font-semibold w-96">Fecha y hora de creación</p>
                <p className="font-semibold w-96">
                  Fecha y hora de última modificación
                </p>
                <p className="font-semibold w-16">¿Activo?</p>
              </div>
            ) : null}
            {filteredUsers.length !== 0 ? (
              filteredUsers.map((user, idx) => (
                <div key={user.id} className="flex gap-4 items-center">
                  <p className="w-6">{idx + 1}</p>
                  <p className="w-96 break-all">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="w-96">
                    {new Intl.DateTimeFormat("es-HN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: true,
                    }).format(new Date(user.created_at))}
                  </p>
                  <p className="w-96">
                    {new Intl.DateTimeFormat("es-HN", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: true,
                    }).format(new Date(user.modified_at))}
                  </p>

                  <div className="w-16">
                    <SwitchOnOff
                      isOn={user.is_active}
                      value=""
                      onChange={() => {
                        setSelectedUser(user);
                        setModalStatus("unsent");
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontró ningún usuario.</p>
            )}
          </div>
          <div className="mt-8">
            <Pagination
              totalProducts={filteredUsers.length}
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
        <h1 className="text-center mb-5">
          ¿Estás seguro de que quieres realizar este cambio en el usuario:{" "}
          <span className="font-semibold">
            {selectedUser.first_name} {selectedUser.last_name}
          </span>
          ?
        </h1>
        <div className="flex gap-5 justify-center">
          <CustomButton
            type="button"
            variant="danger"
            onClick={changeUserStatus}
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

export default UsersPage;
