import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="p-12 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="flex gap-5 flex-wrap align-center">
          <Link
            to="/dashboard/categories"
            className="grow basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Categorías
            </h5>
            <p className="font-normal text-gray-700">
              Administración de todas las categorías de la plataforma
            </p>
          </Link>
          <Link
            to="/dashboard/products"
            className="grow basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Productos
            </h5>
            <p className="font-normal text-gray-700">
              Administración de todas los productos de la plataforma
            </p>
          </Link>
          <Link
            to="/dashboard/users"
            className="grow basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Usuarios
            </h5>
            <p className="font-normal text-gray-700">
              Administración de todas los usuarios de la plataforma
            </p>
          </Link>
          <Link
            to="/dashboard/complaints"
            className="grow basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Denuncias
            </h5>
            <p className="font-normal text-gray-700">
              Administración de todas las denuncias de la plataforma
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
