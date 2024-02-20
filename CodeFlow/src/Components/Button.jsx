import React from "react";
const Button = ({ title, onClick, isActive }) => {
  return (
    <button
      className={`tabButton py-1 px-5 h-30  rounded-md ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      } `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default Button;

// className={`button py-1 px-5 h-30 rounded-md ${
//         isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
//       }`}
