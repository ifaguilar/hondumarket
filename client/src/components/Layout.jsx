import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
