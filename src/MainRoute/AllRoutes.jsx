import { Route, Routes } from "react-router";
import NavBar from "../Pages/NavBar";
import HomePage from "../Pages/HomePage";
import About from "../Pages/About";
import Login from "../Pages/Login";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/navbar" element={<NavBar />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      {/* <Route to="/" element={<Home />} />
        <Route to="/" element={<Home />} /> */}
    </Routes>
  );
}

export default AllRoutes;
