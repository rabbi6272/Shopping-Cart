import { useEffect } from "react";

import { useProductStore } from "../store/store";
import ProductCard from "../components/card";
import Loader from "../components/loader";
import Footer from "../components/footer";

export default function HomePage() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  let isLoading = useProductStore((state) => state.isLoading);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading && (
        <div
          div
          className="h-screen w-full grid place-items-center bg-black bg-opacity-50"
        >
          <Loader />
        </div>
      )}
      <div className="text-center my-4">
        {products.length > 0 && (
          <h1 className="text-3xl font-bold">
            Total Products Found: {products.length}
          </h1>
        )}
      </div>
      <div className="cardContainer min-h-screen h-auto pt-6">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <Footer />
    </>
  );
}

//grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-min gap-4
