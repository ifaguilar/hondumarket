import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import AuthContext from "../context/AuthContextProvider";

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  return <h1>Hola</h1>;
  // <div>{auth ? navigate("/profile") : navigate("/signin")}</div>;
};

export default ProtectedRoute;
