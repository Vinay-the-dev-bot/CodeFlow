import React from "react";
const Button = ({ title, onClick, isActive }) => {
  return (
    <button
      className={`tabButton py-1 px-5 h-30  rounded-md ${
        isActive ? "bg-#19212C  text-white" : " text-white"
      } `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default Button;
