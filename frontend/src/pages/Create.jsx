import { useToast } from "@chakra-ui/react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/store";

export default function CreatePage() {
  const toast = useToast();
  const navigate = useNavigate();

  const productDetails = useProductStore((state) => state.productDetails);
  const setProductDetails = useProductStore((state) => state.setProductDetails);

  async function handleProductSubmit(e) {
    e.preventDefault();
    if (!productDetails.name || !productDetails.price || !productDetails.image)
      return { success: false, message: "Please provide product data" };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          ...productDetails,
        }),
      });
      if (response.ok) {
        const { success, message } = await response.json();
        if (success) {
          setProductDetails({
            name: "",
            price: "",
            image: "",
          });
          toast({
            status: "success",
            title: "Success",
            description: message,
            position: "top-right",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
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
      console.log(error);
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
    <div className="h-[90vh] grid place-items-center bg-gray-200">
      <form
        onSubmit={() => {
          handleProductSubmit;
        }}
        className={` shadow-xl p-4 m-auto flex flex-col gap-4 w-[90vw] md:w-3/5 lg:w-2/5 rounded-lg`}
      >
        <Input
          label="Name"
          type="text"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
        />
        <Input
          label="Price"
          type="text"
          value={productDetails.price}
          onChange={(e) =>
            setProductDetails({ ...productDetails, price: e.target.value })
          }
        />
        <Input
          label="Image link"
          type="text"
          value={productDetails.image}
          onChange={(e) =>
            setProductDetails({ ...productDetails, image: e.target.value })
          }
        />
        <Button type="submit" onClick={handleProductSubmit} fullWidth>
          Create
        </Button>
      </form>
    </div>
  );
}
