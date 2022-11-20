import React, { useContext, useEffect, useRef, useState } from "react";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import CustomButton from "../components/CustomButton";
import CustomSearch from "../components/CustomSearch";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { auth } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    JSON.parse(`{"id": 0, "categoryName": "Todos los productos"}`)
  );
  const [activeDepartment, setActiveDepartment] = useState(
    JSON.parse(`{"id": 0, "departmentName": "Todos los productos"}`)
  );
  const [activeMunicipality, setActiveMunicipality] = useState(
    JSON.parse(`{"id": 0, "municipalityName": "Todos los productos"}`)
  );
  const [isActiveCategorySubbed, setIsActiveCategorySubbed] = useState(false);
  const [order, setOrder] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);

  const searchRef = useRef();
  const categoryRef = useRef();
  const departmentRef = useRef();
  const municipalityRef = useRef();

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/api/categories");
    const data = await response.json();

    setCategories(data);
  };

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();

    setProducts(data);
  };

  const fetchDepartments = async () => {
    const response = await fetch("http://localhost:3000/api/departments");
    const data = await response.json();

    setDepartments(data);
  };

  const fetchMunicipalities = async (departmentId) => {
    if (departmentId !== "") {
      const response = await fetch(
        `http://localhost:3000/api/departments/municipalities/${departmentId}`
      );
      const data = await response.json();

      setMunicipalities(data);
    } else {
      setMunicipalities([]);
    }
  };

  const fetchSubscriptions = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(
      `http://localhost:3000/api/subscriptions/${userId}`
    );
    const data = await response.json();

    localStorage.setItem("subscriptions", JSON.stringify(data.subscriptions));
  };

  const fetchWishlist = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/wishlist`
    );
    const data = await response.json();

    localStorage.setItem("wishlist", JSON.stringify(data.wishlist));
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchDepartments();

    if (auth) {
      fetchSubscriptions();
      fetchWishlist();
    }
  }, []);

  let filteredProducts = products
    .filter((product) =>
      activeCategory.id === 0
        ? product
        : product.category_id === activeCategory.id
    )

    .filter((product) =>
      activeDepartment.id === 0
        ? product
        : product.department_id === activeDepartment.id
    )

    .filter((product) =>
      activeMunicipality.id === 0
        ? product
        : product.municipality_id === activeMunicipality.id
    )

    .filter((product) =>
      search.toLowerCase() === ""
        ? product
        : product.product_name.toLowerCase().includes(search)
    );

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let currentProducts =
    filteredProducts.length < productsPerPage
      ? filteredProducts
      : filteredProducts.slice(firstProductIndex, lastProductIndex);

  const subscribe = async (body) => {
    const response = await fetch("http://localhost:3000/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return data;
  };

  const unsubscribe = async (body) => {
    const response = await fetch(
      "http://localhost:3000/api/subscriptions/unsubscribe",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    return data;
  };

  const subscribeToCategory = async () => {
    try {
      const categoryId = activeCategory.id;
      const userId = JSON.parse(localStorage.getItem("user")).id;

      const body = {
        categoryId,
        userId,
      };

      const data = await subscribe(body);

      if (data.success) {
        localStorage.setItem(
          "subscriptions",
          JSON.stringify(data.subscriptions)
        );
        verifySubscription(categoryId);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const unsubscribeFromCategory = async () => {
    try {
      const categoryId = activeCategory.id;
      const userId = JSON.parse(localStorage.getItem("user")).id;

      const body = {
        categoryId,
        userId,
      };

      const data = await unsubscribe(body);

      if (data.success) {
        localStorage.setItem(
          "subscriptions",
          JSON.stringify(data.subscriptions)
        );
        verifySubscription(categoryId);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const verifySubscription = (categoryId) => {
    const result = JSON.parse(localStorage.getItem("subscriptions")).filter(
      (subscription) => {
        return subscription.category_id === categoryId;
      }
    );

    if (result.length !== 0) {
      setIsActiveCategorySubbed(true);
    } else {
      setIsActiveCategorySubbed(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    searchRef.current.value = "";

    setActiveCategory(
      JSON.parse(`{"id": 0, "categoryName": "Todos los productos"}`)
    );
    categoryRef.current.selectedIndex = 0;

    setActiveDepartment(
      JSON.parse(`{"id": 0, "departmentName": "Todos los productos"}`)
    );
    departmentRef.current.selectedIndex = 0;

    setMunicipalities([]);

    setActiveMunicipality(
      JSON.parse(`{"id": 0, "municipalityName": "Todos los productos"}`)
    );
    municipalityRef.current.selectedIndex = 0;
  };

  return (
    <div className="container mx-auto mt-16 py-16 min-h-screen flex flex-col gap-16">
      <div className="flex gap-16">
        <div className="flex flex-col gap-12 ">
          <h2 className="text-3xl font-bold">Filtros</h2>
          <div className="flex flex-col gap-16 p-8 bg-white rounded-lg shadow-sm min-h-screen">
            <CustomButton
              type="button"
              variant="primary"
              onClick={() => clearFilters()}
            >
              Limpiar filtros
            </CustomButton>
            <CustomSearch
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              innerRef={searchRef}
            />

            <div className="flex flex-col gap-4">
              <label htmlFor="categories">Categoría</label>
              <select
                name="categories"
                className="w-72 appearance-none select-arrow h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]"
                onChange={(e) => {
                  setActiveCategory(JSON.parse(e.target.value));
                  auth
                    ? verifySubscription(JSON.parse(e.target.value).id)
                    : null;
                }}
                ref={categoryRef}
              >
                <option
                  value={`{"id": 0, "categoryName": "Todos los productos"}`}
                >
                  Selecciona una categoría...
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={`{"id": ${category.id}, "categoryName": "${category.category_name}"}`}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="departments">Departamento</label>
              <select
                name="departments"
                className="w-72 appearance-none select-arrow h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]"
                onChange={(e) => {
                  setActiveDepartment(JSON.parse(e.target.value));
                  setActiveMunicipality(
                    JSON.parse(
                      `{"id": 0, "municipalityName": "Todos los productos"}`
                    )
                  );
                  fetchMunicipalities(JSON.parse(e.target.value).id);
                }}
                ref={departmentRef}
              >
                <option
                  value={`{"id": 0, "departmentName": "Todos los productos"}`}
                >
                  Selecciona un departamento...
                </option>
                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={`{"id": ${department.id}, "departmentName": "${department.department_name}"}`}
                  >
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="municipalities">Municipio</label>
              <select
                name="municipalities"
                className="w-72 appearance-none select-arrow h-14 rounded-md px-5 bg-gray-100 placeholder-gray-500 focus:bg-white focus:shadow-[inset_0_0_0_2px_rgba(59,130,246,1)] outline-0 text-sm transition hover:shadow-[inset_0_0_0_2px_rgba(209,213,219,1)]"
                onChange={(e) =>
                  setActiveMunicipality(JSON.parse(e.target.value))
                }
                ref={municipalityRef}
              >
                <option
                  value={`{"id": 0, "municipalityName": "Todos los productos"}`}
                >
                  Selecciona un municipio...
                </option>
                {municipalities.map((municipality) => (
                  <option
                    key={municipality.id}
                    value={`{"id": ${municipality.id}, "municipalityName": "${municipality.municipality_name}"}`}
                  >
                    {municipality.municipality_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold">
                {activeCategory.categoryName}
              </h1>
              {auth &&
              activeCategory.categoryName !== "Todos los productos" &&
              isActiveCategorySubbed ? (
                <button
                  className="text-sm font-medium btn-muted px-4 py-2 rounded"
                  onClick={() => unsubscribeFromCategory()}
                >
                  Suscrito
                </button>
              ) : auth &&
                activeCategory.categoryName !== "Todos los productos" ? (
                <button
                  className="text-sm font-medium btn-primary px-4 py-2 rounded"
                  onClick={() => subscribeToCategory()}
                >
                  Suscribirse
                </button>
              ) : null}
            </div>
            <div>
              <button
                className="text-sm font-medium btn-secondary px-4 py-2 rounded transition"
                onClick={() => {
                  setProducts(products.reverse());
                  setOrder(!order);
                }}
              >
                {order
                  ? "Ordenados por: Más antiguos"
                  : "Ordenados por: Más recientes"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-16">
            {currentProducts.length !== 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
          {filteredProducts.length > productsPerPage ? (
            <Pagination
              totalProducts={products.length}
              productsPerPage={productsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
