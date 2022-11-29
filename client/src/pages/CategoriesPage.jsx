import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

// Components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomSelect from "../components/CustomSelect";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";

// Utils
import { CategoryFormSchema } from "../utils/FormSchemas";

const CategoriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(10);

  const fetchCategories = async () => {
    const response = await fetch(
      "http://localhost:3000/api/categories/dashboard"
    );
    const data = await response.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });

  const lastCategoryIndex = currentPage * categoriesPerPage;
  const firstCategoryIndex = lastCategoryIndex - categoriesPerPage;
  let currentCategories = categories.slice(
    firstCategoryIndex,
    lastCategoryIndex
  );

  const updateCategory = async (body) => {
    const response = await fetch(
      `http://localhost:3000/api/categories/${activeCategory.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return data;
  };

  const onSubmit = async (values) => {
    try {
      const categoryId = activeCategory.id;
      const categoryName = values.categoryName;
      const isActive = values.isActive;

      const body = {
        categoryId,
        categoryName,
        isActive,
      };

      const data = await updateCategory(body);

      if (data.success) {
        fetchCategories();
        setOpenModal(false);
        setActiveCategory([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Modal open={openModal} close={() => setOpenModal(false)}>
        {activeCategory && (
          <Formik
            initialValues={{
              categoryName: `${activeCategory.categoryName}`,
              isActive: "",
            }}
            validationSchema={CategoryFormSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold">Información general</h3>

                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">ID de categoría:</span>
                    <span>{activeCategory.id}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Nombre de categoría:</span>
                    <span>{activeCategory.categoryName}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Fecha y hora de creación
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "long",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(activeCategory.createdAt))}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">
                      Fecha y hora de última modificación
                    </span>
                    <span>
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "long",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(activeCategory.modifiedAt))}
                    </span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold">Estado:</span>
                    <span>{activeCategory.isActive ? "Activa" : "Oculta"}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <h3 className="text-xl font-bold">Campos editables</h3>
                  <div className="grid grid-cols-2">
                    <CustomInput
                      label="Nombre de categoría"
                      type="text"
                      name="categoryName"
                      placeholder="Ingresa el nombre de categoría..."
                      required
                    />

                    <CustomSelect
                      label="Estado"
                      name="isActive"
                      onChange={(e) => props.handleChange(e)}
                      required
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value={true}>Activa</option>
                      <option value={false}>Oculta</option>
                    </CustomSelect>
                  </div>

                  <div className="max-w-sm">
                    <CustomButton type="submit" variant="primary">
                      Guardar cambios
                    </CustomButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
      <div className="container mx-auto mt-16 py-16 min-h-screen">
        {loading ? (
          <div className="flex align-center justify-center">
            <PuffLoader color={"#3B82F6"} />
          </div>
        ) : (
          <div className="p-12 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold">Categorías</h2>
            <div className="flex flex-col gap-12 mt-12">
              {categories.length !== 0 ? (
                <div className="flex gap-4 items-center">
                  <p className="font-semibold w-6">#</p>
                  <p className="font-semibold w-96">Nombre de categoría</p>
                  <p className="font-semibold w-96">Fecha y hora de creación</p>
                  <p className="font-semibold w-96">
                    Fecha y hora de última modificación
                  </p>
                  <p className="font-semibold"></p>
                </div>
              ) : null}
              {currentCategories.length !== 0 ? (
                currentCategories.map((category) => (
                  <div key={category.id} className="flex gap-4 items-center">
                    <p className="w-6">{category.id}</p>
                    <p className="w-96">{category.category_name}</p>
                    <p className="w-96">
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(category.created_at))}
                    </p>
                    <p className="w-96">
                      {new Intl.DateTimeFormat("es-HN", {
                        dateStyle: "short",
                        timeStyle: "short",
                        hour12: true,
                      }).format(new Date(category.modified_at))}
                    </p>
                    <CustomButton
                      type="button"
                      variant="primary"
                      onClick={() => {
                        setActiveCategory(
                          JSON.parse(`{
                            "id": ${category.id}, 
                            "categoryName": "${category.category_name}",
                            "createdAt": "${category.created_at}",
                            "modifiedAt": "${category.modified_at}",
                            "isActive": ${category.is_active}
                          }`)
                        );
                        setOpenModal(true);
                      }}
                    >
                      Editar
                    </CustomButton>
                  </div>
                ))
              ) : (
                <p>No hay categorías.</p>
              )}
            </div>
            <div className="mt-8">
              <Pagination
                totalProducts={categories.length}
                productsPerPage={categoriesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
