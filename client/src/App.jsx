import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Context
import AuthContext from "./context/AuthContextProvider";

// Components
import Layout from "./components/Layout";

// Pages

import CategoriesPage from "./pages/Admin/CategoriesPage";

import CategoriesPage from "./pages/CategoriesPage";

import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import ProductsPage from "./pages/Admin/ProductsPage";

import ProductsPage from "./pages/ProductsPage";

import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TermsPage from "./pages/TermsPage";
import WishlistPage from "./pages/WishlistPage";
import { isUserAdmin } from "./utils/user";
import LayoutAdmin from "./components/LayoutAdmin";
import AdminComplaintsPage from "./pages/Admin/AdminComplaintsPage";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import DashboardPage from "./pages/Admin/DashboardPage";

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

		{isUserAdmin() &&
			<Route exact path="/admin" element={<LayoutAdmin/>}>
				<Route path="" element={<DashboardPage />} />
				<Route path="categories" element={<CategoriesPage />} />
				<Route path="products" element={<ProductsPage />} />
				<Route path="complaints" element={<AdminComplaintsPage />} />
				<Route path="users" element={<AdminUserPage/>} />
			</Route>
		}
    </Routes>
  );
};

export default App;
