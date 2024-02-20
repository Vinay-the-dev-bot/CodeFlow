import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./MainRoute/AllRoutes";
import NavBar from "./Pages/NavBar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <AllRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
