import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./MainRoute/AllRoutes";
import NavBar from "./Components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <AllRoutes />
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
