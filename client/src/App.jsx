import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Context
import AuthContext from "./context/AuthContextProvider";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";

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
      <Route
        exact
        path="/forgot-password"
        element={auth ? <Navigate to="/" /> : <ForgotPasswordPage />}
      />
      <Route
        path="/reset-password/:id/:token"
        element={
          "resetToken" in localStorage ? (
            <ResetPasswordPage />
          ) : (
            <Navigate to="/404" />
          )
        }
      />
    </Routes>
  );
};

export default App;
