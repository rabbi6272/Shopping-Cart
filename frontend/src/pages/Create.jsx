import { useToast } from "@chakra-ui/react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/store";

export default function CreatePage({ cardBg, text }) {
  const toast = useToast();
  const navigate = useNavigate();

  const productDetails = useProductStore((state) => state.productDetails);
  const setProductDetails = useProductStore((state) => state.setProductDetails);
  const createProduct = useProductStore((state) => state.createProduct);

  async function handleProductSubmit(e) {
    e.preventDefault();
    try {
      const result = await createProduct(productDetails);
      const { success, message } = result;
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
    <div className={`h-[90vh] grid place-items-center`}>
      <form
        onSubmit={() => {
          handleProductSubmit;
        }}
        className={`${cardBg} ${text} shadow-xl p-4 m-auto flex flex-col gap-4 w-[90vw] md:w-3/5 lg:w-2/5 rounded-lg`}
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
