import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Context
import AuthContext from "./context/AuthContextProvider";

// Components
import Layout from "./components/Layout";

// Pages
import AdminComplaintsPage from "./pages/Admin/AdminComplaintsPage";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import CategoriesPage from "./pages/Admin/CategoriesPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import ProductsPage from "./pages/Admin/ProductsPage";
import ChatPage from "./pages/ChatPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";
import WishlistPage from "./pages/WishlistPage";

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
        <Route
          path="/wishlist"
          element={auth ? <WishlistPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={auth ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={auth ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/categories"
          element={auth ? <CategoriesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/products"
          element={auth ? <ProductsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/complaints"
          element={auth ? <AdminComplaintsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/users"
          element={auth ? <AdminUserPage /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={auth ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
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
