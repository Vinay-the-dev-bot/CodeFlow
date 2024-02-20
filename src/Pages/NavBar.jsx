import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="html">HTML Compiler</Link>
      <Link to="judger">Judger</Link>
      <Link to="html">HTML Compiler</Link>
      <Link to="signup">Sign Up</Link>
      <Link to="login">Login</Link>
    </nav>
  );
}

export default NavBar;
