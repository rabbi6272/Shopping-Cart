import { Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { PlusSquareIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar({ bg, colorMode, toggleColorMode }) {
  return (
    <nav
      className={`w-full px-4 py-2 flex justify-between items-center sticky top-0 font-inter z-10 ${bg}`}
    >
      <Link to="/">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Shoping Cart🛒
        </Text>
      </Link>
      <div className="flex gap-4">
        <Link to="/create">
          <span className="bg-blue-gray-900 p-2 rounded-full grid place-items-center">
            <PlusSquareIcon h={5} w={5} color={"white"} />
          </span>
        </Link>
        <span
          className="bg-blue-gray-900 p-2 rounded-full grid place-items-center"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <MoonIcon h={5} w={5} color={"white"} />
          ) : (
            <SunIcon h={5} w={5} color={"white"} />
          )}
        </span>
      </div>
    </nav>
  );
}
