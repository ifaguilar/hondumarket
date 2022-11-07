import React, { useContext, useEffect, useState } from "react";

// Context
import AuthContext from "../context/AuthContextProvider";

// Components
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { auth } = useContext(AuthContext);

  // useStates: Diferentes estados que se utilizan en la página actual.
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos los productos");
  const [isActiveCategorySubbed, setIsActiveCategorySubbed] = useState(false);

  // Variables que obtienen datos del Local Storage.
  const storedCategories = JSON.parse(localStorage.getItem("categories"));
  const storedProducts = JSON.parse(localStorage.getItem("products"));

  // Método       GET
  // Descripción  Obtiene todas las categorías que existen en la base de datos.
  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3000/api/categories");
    const data = await response.json();

    localStorage.setItem("categories", JSON.stringify(data));
    setCategories(data);
  };

  // Método       GET
  // Descripción  Obtiene todos los productos que existen en la base de datos.
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();

    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  // Método       GET
  // Descripción  Obtiene todas las suscripciones del usuario actual que existen en la base de datos.
  const fetchSubscriptions = async () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const response = await fetch(
      `http://localhost:3000/api/subscriptions/${id}`
    );
    const data = await response.json();

    localStorage.setItem("subscriptions", JSON.stringify(data.subscriptions));
  };

  // useEffects: Se ejecutan una sola vez cuando la página carga.
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Filtra los productos guardados en storedProducts
  // y retorna solamente los productos que pertenecen
  // al id de categoría que se específica.
  //
  // Por último, actualiza el estado de los productos.
  const filterByCategory = (categoryId) => {
    const result = storedProducts.filter((product) => {
      return product.category_id === categoryId;
    });

    setProducts(result);
  };

  // Filtra las categorías guardadas en storedCategories
  // y retorna la categoría con el nombre que se
  // específica.
  //
  // Por último, retorna el id de dicha categoría.
  const getActiveCategoryId = () => {
    const result = storedCategories.filter((category) => {
      return category.category_name === activeCategory;
    });

    return result[0].id;
  };

  // Método       POST
  // Descripción  Ingresa una nueva entrada a la tabla Subscriptions con los datos que se mandan.
  const subscribe = async (body) => {
    const response = await fetch("http://localhost:3000/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  };

  // Método       DELETE
  // Descripción  Elimina una entrada de la tabla Subscriptions que cumpla con los datos que se mandan.
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

  // Función que verifica si la categoría actual que se está filtrando
  // (categoría activa) se encuentra en la lista de suscripciones del
  // usuario que está logeado.
  //
  // Esta verificación se realiza con el fin de modificar el estado
  // de la categoría activa.
  //
  // Si la categoría activa está en la lista de suscripciones del usuario,
  // se mostrará el botón de 'Desuscribirse', el cual llama a la función
  // unsubscribeFromCategory().
  //
  // De lo contrario, se mostrará el botón de 'Suscribirse', el cuál llama
  // a la función subscriteToCategory().
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

  // Función que obtiene el id de la categoría actual que se está filtrando
  // (categoría activa) y el id del usuario que está logeado.
  //
  // Guarda los datos en el body y los manda a la función que se encarga de
  // hacer la petición (Suscribirse a la categoría).
  //
  // Luego de obtener los datos de la petición, verifica si esta se realizó
  // correctamente. Si es así, guarda las suscripciones que vienen en la
  // petición en el Local Storage.
  //
  // Por último, llama a la función de verificación de suscripción.
  const subscribeToCategory = async () => {
    try {
      const categoryId = getActiveCategoryId();
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

  // Función que obtiene el id de la categoría actual que se está filtrando
  // (categoría activa) y el id del usuario que está logeado.
  //
  // Guarda los datos en el body y los manda a la función que se encarga de
  // hacer la petición (Desuscribirse de categoría).
  //
  // Luego de obtener los datos de la petición, verifica si esta se realizó
  // correctamente. Si es así, guarda las suscripciones que vienen en la
  // petición en el Local Storage.
  //
  // Por último, llama a la función de verificación de suscripción.
  const unsubscribeFromCategory = async () => {
    try {
      const categoryId = getActiveCategoryId();
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

  return (
    <div className="container mx-auto py-12 min-h-screen flex flex-col gap-16">
      <div className="flex gap-4 whitespace-nowrap overflow-auto py-4">
        <button
          className="text-sm font-medium text-blue-500 bg-blue-100 px-4 py-2 rounded"
          onClick={() => {
            setActiveCategory("Todos los productos");
            setProducts(storedProducts);
          }}
        >
          Todos los productos
        </button>
        {categories.map((category) => (
          <button
            className="text-sm font-medium text-blue-500 bg-blue-100 px-4 py-2 rounded"
            key={category.id}
            onClick={() => {
              setActiveCategory(category.category_name);
              filterByCategory(category.id);
              verifySubscription(category.id);
            }}
          >
            {category.category_name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-bold">{activeCategory}</h1>
        {auth &&
        activeCategory !== "Todos los productos" &&
        isActiveCategorySubbed ? (
          <button
            className="text-sm font-medium btn-danger px-4 py-2 rounded"
            onClick={() => unsubscribeFromCategory()}
          >
            Desuscribirse
          </button>
        ) : auth && activeCategory !== "Todos los productos" ? (
          <button
            className="text-sm font-medium btn-success px-4 py-2 rounded"
            onClick={() => subscribeToCategory()}
          >
            Suscribirse
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-16">
        {products.length !== 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
