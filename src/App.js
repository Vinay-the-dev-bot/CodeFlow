import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./MainRoute/AllRoutes";
import NavBar from "./Pages/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <AllRoutes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
