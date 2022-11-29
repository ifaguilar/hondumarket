import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="p-12 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Link to="/dashboard/categories">
          <span>Categorías</span>
        </Link>
        <Link to="/dashboard/products">
          <span>Productos</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
