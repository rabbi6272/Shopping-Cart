import { useEffect } from "react";
import ProductCard from "../components/card";
import { useProductStore } from "../store/store";
import Loader from "../components/loader";

export default function HomePage({ cardBg, text }) {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {loading && (
        <div className="h-screen w-full">
          <Loader />
        </div>
      )}
      <div className="text-center my-4">
        {products.length > 0 && (
          <h1 className={`text-3xl font-bold  ${text}`}>
            Total Products: {products.length}
          </h1>
        )}
      </div>
      <div className="cardContainer min-h-screen h-auto pt-6">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cardBg={cardBg}
              text={text}
            />
          ))}
      </div>
    </>
  );
}

//grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-min gap-4
