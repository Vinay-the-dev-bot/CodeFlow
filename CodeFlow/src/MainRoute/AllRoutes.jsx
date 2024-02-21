import { Route, Routes } from "react-router";
import NavBar from "../Pages/NavBar";
import HomePage from "../Pages/HomePage";
import About from "../Pages/About";
import Login from "../Pages/Login";
import HTMLCompiler from "../Pages/HTMLCompiler";
import Judger from "../Pages/Judger";
import SignUP from "../Pages/SignUp";
// import Contest from "../Pages/Contest";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/navbar" element={<NavBar />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/contest" element={<Contest />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUP />} />
      <Route path="/html" element={<HTMLCompiler />} />
      <Route path="/judger" element={<Judger />} />
      {/* <Route to="/" element={<Home />} />
        <Route to="/" element={<Home />} /> */}
    </Routes>
  );
}

export default AllRoutes;
