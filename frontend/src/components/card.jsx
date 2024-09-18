import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { EditIcon, DeleteIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/store";
import { useToast } from "@chakra-ui/react";
import card from "@material-tailwind/react/theme/components/card";

export default function ProductCard({ product, cardBg, text }) {
  const [showDetails, setShowDetails] = useState(false);
  const toast = useToast();
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  async function handleDeleteProduct(e, productId) {
    e.preventDefault();
    const { success, message } = await deleteProduct(productId);
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

  return (
    <Card className={`font-nunito w-full h-auto shadow-lg ${cardBg} ${text}`}>
      <CardHeader shadow={true} floated={false} className="h-80 ">
        <img
          src={product.image}
          alt="card-image"
          className="h-full w-full object-cover cardHeader"
        />
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
      </CardHeader>
      <CardBody>
        <div className="m-0 flex items-center justify-between">
          <Typography className="font-medium">{product.name}</Typography>
          <Typography className="font-medium">${product.price}</Typography>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col gap-4">
        <Button
          fullWidth={true}
          className="bg-black  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

//bg-blue-gray-900/10 text-blue-gray-900
