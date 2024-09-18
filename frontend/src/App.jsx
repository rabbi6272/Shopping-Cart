import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import CreatePage from "./pages/Create.jsx";
import UpdatePage from "./pages/Update.jsx";
import Navbar from "./components/navbar.jsx";
import { useProductStore } from "./store/store.js";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import "./app.css";

export default function App() {
  const productDetails = useProductStore((state) => state.productDetails);
  const setProductDetails = useProductStore((state) => state.setProductDetails);

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("bg-cinnabar-50", "bg-black");
  const cardBg = useColorModeValue("bg-white", "bg-cardBg-dark-50");
  const text = useColorModeValue("text-blue-gray-800", "text-white");

  return (
    <div className={`h-auto min-h-screen font-nunito ${bg} ${text}`}>
      <Navbar bg={bg} colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/" element={<HomePage cardBg={cardBg} text={text} />} />
        <Route
          path="/create"
          element={
            <CreatePage
              cardBg={cardBg}
              text={text}
              productDetails={productDetails}
              setProductDetails={setProductDetails}
            />
          }
        />
        <Route
          path="/update"
          element={<UpdatePage cardBg={cardBg} text={text} />}
        />
      </Routes>
    </div>
  );
}
