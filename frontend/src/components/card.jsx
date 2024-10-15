import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useProductStore, useAdminStore } from "../store/store";
import { useToast } from "@chakra-ui/react";

export default function ProductCard({ product }) {
  const [showDetails, setShowDetails] = useState(false);

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const setProductDetails = useProductStore((state) => state.setProductDetails);

  const admin = useAdminStore((state) => state.admin);

  const toast = useToast();

  async function handleDeleteProduct(e, productId) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (response.ok) {
        const { success, message } = await response.json();
        if (success) {
          await fetchProducts();
          toast({
            status: "success",
            title: "Success",
            description: message,
            position: "top-right",
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            status: "error",
            title: "Error",
            description: message,
            position: "top-right",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="bg-white font-nunito w-full h-auto shadow-lg rounded-md">
      <div
        shadow={"true"}
        floated={"false"}
        className="img-container h-80 relative overflow-hidden shadow"
      >
        <img src={product.image} alt="card-image" className="h-full w-full " />
        {admin && (
          <div className="card-overlay w-full h-full absolute top-0 left-0 ">
            <div className="absolute top-1 right-2 w-full ">
              <span className="float-right block cursor-pointer">
                <InfoOutlineIcon
                  h={5}
                  w={5}
                  color={"white"}
                  onClick={() => setShowDetails(!showDetails)}
                />
              </span>
              <div
                className={`pr-2 flex gap-4 justify-end  ${
                  showDetails ? "show" : "hide"
                } `}
              >
                <Link to="/update">
                  <span
                    onClick={() => setProductDetails({ ...product })}
                    className="bg-black p-2 rounded-full grid place-items-center shadow-lg hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    <EditIcon h={4} w={4} color={"white"} />
                  </span>
                </Link>
                <span
                  onClick={(e) => handleDeleteProduct(e, product._id)}
                  className="bg-black p-2 rounded-full grid place-items-center shadow-lg hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  <DeleteIcon h={4} w={4} color={"white"} />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between p-4">
          <h3 className="text-xl font-semibold font-nunito">{product.name}</h3>
          <h3 className="font-medium text-green-500">${product.price}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-4 mb-4">
        <Button
          fullWidth={true}
          className="shadow-lg hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

//bg-blue-gray-900/10 text-blue-gray-900
