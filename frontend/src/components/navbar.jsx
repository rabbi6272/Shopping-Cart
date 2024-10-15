import { Text, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../store/store";

export default function Navbar() {
  const admin = useAdminStore((state) => state.admin);
  return (
    <nav className="w-full px-4 py-2 flex justify-between items-center sticky top-0 font-inter z-10 bg-white">
      <Link to="/">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Shoping Cart
        </Text>
      </Link>
      <div className="flex gap-4">
        {admin && (
          <Link to="/admin/create">
            <span className="bg-black text-white cursor-pointer p-2 rounded-full grid place-items-center">
              <span className="material-symbols-outlined">add_circle</span>
            </span>
          </Link>
        )}
        <Link to="/admin/login">
          <Tooltip label="Login" hasArrow>
            <span className="bg-black text-white cursor-pointer p-2 rounded-full grid place-items-center">
              <span className="material-symbols-outlined">account_circle</span>
            </span>
          </Tooltip>
        </Link>
      </div>
    </nav>
  );
}
