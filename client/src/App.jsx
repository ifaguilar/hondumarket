import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import AuthContext from "./context/AuthContextProvider";

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if ("token" in localStorage) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);

  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route
        exact
        path="/signin"
        element={auth ? <Navigate to="/" /> : <SigninPage />}
      />
      <Route
        exact
        path="/signup"
        element={auth ? <Navigate to="/" /> : <SignupPage />}
      />
    </Routes>
  );
};

export default App;
