import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto py-12 min-h-screen">
      <h2 className="text-3xl font-bold">Últimos productos</h2>
    </div>
  );
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   const response = await fetch("http://localhost:3000/api/products");
  //   const data = await response.json();

  //   setProducts(data);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // return (
  //   <div className="container mx-auto py-12">
  //     <h2 className="">Últimos productos</h2>
  //     <div className="grid grid-cols-4 gap-16">
  //       {products.map((product) => (
  //         <ProductCard key={product.id} product={product} />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default HomePage;
