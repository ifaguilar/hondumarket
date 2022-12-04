import React, { useEffect, useState } from "react";

// Components
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import DoughnutChart from "../../components/DoughnutChart";
import LineChart from "../../components/LineChart";
import Stadistics from "../../components/Stadistics";

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalCategories, setTotalCategories] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({
    labels: [],
    datasets: [],
  });
  const [productsByCondition, setProductsByCondition] = useState({
    labels: [],
    datasets: [],
  });
  const [usersByDepartment, setUsersByDepartment] = useState({
    labels: [],
    datasets: [],
  });
  const [usersByMonth, setUsersByMonth] = useState({
    labels: [],
    datasets: [],
  });

  const bgColors = [
    "#bfdbfe", // Blue
    "#bbf7d0", // Green
    "#fde68a", // Amber
    "#fecaca", // Red
    "#c7d2fe", // Indigo
    "#99f6e4", // Teal
  ];

  const borderColors = [
    "#2563eb", // Blue
    "#16a34a", // Green
    "#d97706", // Amber
    "#dc2626", // Red
    "#4f46e5", // Indigo
    "#0d9488", // Teal
  ];

  const fetchTotalUsers = async () => {
    const response = await fetch("http://localhost:3000/api/dashboard/users");
    const data = await response.json();

    setTotalUsers(data.numberOfUsers);
  };

  const fetchTotalProducts = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/products"
    );
    const data = await response.json();

    setTotalProducts(data.numberOfProducts);
  };

  const fetchTotalCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/categories"
    );
    const data = await response.json();

    setTotalCategories(data.numberOfCategories);
  };

  const fetchTotalComplaints = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/complaints"
    );
    const data = await response.json();

    setTotalComplaints(data.numberOfComplaints);
  };

  const fetchProductsByCategory = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/productsByCategory"
    );
    const data = await response.json();

    setProductsByCategory({
      labels: data.map((item) => item.category_name),
      datasets: [
        {
          label: "Cantidad de productos",
          data: data.map((item) => item.products),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    });
  };

  const fetchProductsByCondition = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/productsByCondition"
    );
    const data = await response.json();

    setProductsByCondition({
      labels: data.map((item) => item.condition_name),
      datasets: [
        {
          label: "Cantidad de productos",
          data: data.map((item) => item.products),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    });
  };

  const fetchUsersByDepartment = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/usersByDepartment"
    );
    const data = await response.json();

    setUsersByDepartment({
      labels: data.map((item) => item.department_name),
      datasets: [
        {
          label: "Cantidad de usuarios",
          data: data.map((item) => item.users),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2,
        },
      ],
    });
  };

  const fetchUsersByMonth = async () => {
    const response = await fetch(
      "http://localhost:3000/api/dashboard/usersByMonth"
    );
    const data = await response.json();

    setUsersByMonth({
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: "Cantidad de usuarios",
          data: data.map((item) => item.users),
          backgroundColor: bgColors,
          borderColor: borderColors,
          pointRadius: 4,
          pointHoverRadius: 8,
        },
      ],
    });
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalProducts();
    fetchTotalCategories();
    fetchTotalComplaints();
    fetchProductsByCategory();
    fetchProductsByCondition();
    fetchUsersByDepartment();
    fetchUsersByMonth();
  }, []);

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const doughnutOptions = {
    plugins: {
      datalabels: {
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: (value, context) => {
          let sum = 0;

          const dataArray = context.chart.data.datasets[0].data;

          dataArray.map((data) => {
            sum += parseInt(data);
          });

          let percentage = ((parseInt(value) * 100) / sum).toFixed(1) + "%";
          return percentage;
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const lineOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="flex flex-col gap-16">
        <h2 className="text-3xl font-bold">
          Bienvenido, {JSON.parse(localStorage.getItem("user")).firstName}.
        </h2>
        <div className="grid grid-cols-4 gap-12">
          <Stadistics
            color="blue"
            count={totalUsers}
            title="Usuarios registrados"
            link="/dashboard/users"
            text="usuarios"
          />
          <Stadistics
            color="green"
            count={totalProducts}
            title="Productos publicados"
            link="/dashboard/products"
            text="productos"
          />
          <Stadistics
            color="amber"
            count={totalCategories}
            title="Categorías creadas"
            link="/dashboard/categories"
            text="categorías"
          />
          <Stadistics
            color="red"
            count={totalComplaints}
            title="Denuncias pendientes"
            link="/dashboard/complaints"
            text="denuncias"
          />
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-12">
          <div className="bg-white rounded-lg p-8 shadow">
            <h3 className="text-lg font-medium mb-4">
              Cantidad de productos por categorías:
            </h3>
            {productsByCategory && (
              <BarChart chartData={productsByCategory} options={barOptions} />
            )}
          </div>
          <div className="bg-white rounded-lg p-8 shadow">
            <h3 className="text-lg font-medium mb-4">
              Cantidad de productos por estado:
            </h3>
            {productsByCondition && (
              <PieChart
                chartData={productsByCondition}
                options={doughnutOptions}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-12">
          <div className="bg-white rounded-lg p-8 shadow">
            <h3 className="text-lg font-medium mb-4">
              Cantidad de usuarios por departamento:
            </h3>
            {usersByDepartment && (
              <DoughnutChart
                chartData={usersByDepartment}
                options={doughnutOptions}
              />
            )}
          </div>
          <div className="bg-white rounded-lg p-8 shadow">
            <h3 className="text-lg font-medium mb-4">
              Cantidad de usuarios registrados por mes:
            </h3>
            {usersByMonth && (
              <LineChart chartData={usersByMonth} options={lineOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
