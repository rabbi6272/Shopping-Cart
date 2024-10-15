import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useToast } from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

import { useAdminStore } from "../store/store";

export default function AdminLogin() {
  const navigate = useNavigate();

  const toast = useToast();

  const adminDetails = useAdminStore((state) => state.adminDetails);
  const setAdminDetails = useAdminStore((state) => state.setAdminDetails);

  const setAdmin = useAdminStore((state) => state.setAdmin);

  async function handleAdminSubmit(e) {
    e.preventDefault();
    if (!adminDetails.email || !adminDetails.password)
      return toast({
        status: "error",
        title: "Error",
        description: "Please provide all admin details",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });

    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(adminDetails),
      });

      const { success, message } = await response.json();
      if (success) {
        toast({
          status: "success",
          title: "Success",
          description: message,
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
        setAdminDetails({ email: "", password: "", rememberMe: false });
        setAdmin(true);

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
    <div className="bg-inherit min-h-screen w-full flex justify-center items-center">
      <Card color="white" shadow={"true"} className=" p-4 ">
        <Typography variant="h3" color="blue-gray" className="text-center">
          Log In
        </Typography>
        <form
          className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleAdminSubmit(e)}
        >
          <div className="mb-1 flex flex-col gap-6">
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
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Keep me logged in
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            value={adminDetails.rememberMe}
            onChange={(e) =>
              setAdminDetails({
                ...adminDetails,
                rememberMe: !e.target.rememberMe,
              })
            }
          />
          <Button
            className="mt-6"
            fullWidth
            type="submit"
            onClick={(e) => handleAdminSubmit(e)}
          >
            sign in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/admin-signup" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
