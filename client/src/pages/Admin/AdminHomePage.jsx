import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
    return (
        <div className="container mx-auto mt-16 py-16 min-h-screen">
            AdminHomePage
            <p>
              <Link to="/admin/users">usuarios</Link>
            </p>
            <p>
              <Link to="/admin/complaints">denuncias</Link>
            </p>
        </div>
    );
};

export default AdminHomePage;
