import { useToast } from "@chakra-ui/react";
import { Input, Button } from "@material-tailwind/react";
import { useProductStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function UpdatePage({ cardBg, text }) {
  const toast = useToast();
  const navigate = useNavigate();

  const productDetails = useProductStore((state) => state.productDetails);
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const updateProduct = useProductStore((state) => state.updateProduct);

  async function handleProductSubmit(e, id) {
    e.preventDefault();
    if (!id) {
      toast({
        status: "error",
        title: "Error",
        description: "No product ID provided",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const { success, message } = await updateProduct(id, productDetails);
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
        }, 2000);
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
    <div className={`h-[90vh] grid place-items-center `}>
      <form
        onSubmit={(e) => handleProductSubmit(e, id)}
        className={`${cardBg} ${text} shadow-xl p-4 m-auto flex flex-col gap-4 w-[90vw] md:w-3/5 lg:w-2/5 rounded-lg`}
      >
        <Input
          label="Name"
          type="text"
          value={productDetails.name}
          onChange={(e) =>
            setProductDetails({ ...productDetails, name: e.target.value })
          }
          autoFocus
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
        <Button
          type="submit"
          onClick={(e) => handleProductSubmit(e, productDetails._id)}
          fullWidth
        >
          Update
        </Button>
      </form>
    </div>
  );
}
