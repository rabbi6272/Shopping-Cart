import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminStore } from "../store/store";
import { useToast } from "@chakra-ui/react";

export default function AdminSignup() {
  const adminDetails = useAdminStore((state) => state.adminDetails);
  const setAdminDetails = useAdminStore((state) => state.setAdminDetails);

  const navigate = useNavigate();

  const toast = useToast();

  async function handleAdminSubmit(e) {
    e.preventDefault();
    if (
      !adminDetails.name ||
      !adminDetails.email ||
      !adminDetails.password ||
      !adminDetails.secretCode
    )
      return toast({
        title: "Error",
        status: "error",
        description: "Please provide all the fields",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });

    try {
      const response = await fetch("http://localhost:5000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          ...adminDetails,
        }),
      });

      let { success, message } = await response.json();
      if (success) {
        toast({
          title: "Success",
          status: "success",
          description: message,
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/admin/login");
        }, 1500);
      } else {
        toast({
          title: "Error",
          status: "error",
          description: message,
          duration: 2000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        status: "error",
        description: error.message,
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card color="white" shadow={true} className=" p-4">
        <Typography variant="h3" color="blue-gray" className="text-center">
          Sign Up
        </Typography>
        <form
          className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleAdminSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminDetails.name}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, name: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminDetails.email}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, email: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminDetails.password}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, password: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-6">
              Secret Code
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={adminDetails.secretCode}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, secretCode: e.target.value })
              }
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/admin-login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
