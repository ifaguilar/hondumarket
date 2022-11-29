import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Context
import AuthContext from "./context/AuthContextProvider";

// Components
import Layout from "./components/Layout";

// Pages
import CategoriesPage from "./pages/CategoriesPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import MyProductsPage from "./pages/MyProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
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
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/categories" element={<CategoriesPage />} />
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/my-products" element={<MyProductsPage />} />
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
