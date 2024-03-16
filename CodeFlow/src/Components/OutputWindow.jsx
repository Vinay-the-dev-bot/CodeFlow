import React from "react";

const OutputWindow = ({ error, outputDetails, statusID }) => {
  const statuses = [
    {
      id: 3,
      description: "Solved",
    },
    {
      id: 4,
      description: "Wrong Answer",
    },
    {
      id: 5,
      description: "Time Limit Exceeded",
    },
    {
      id: 6,
      description: "Compilation Error",
    },
    {
      id: 7,
      description: "Runtime Error (SIGSEGV)",
    },
    {
      id: 8,
      description: "Runtime Error (SIGXFSZ)",
    },
    {
      id: 9,
      description: "Runtime Error (SIGFPE)",
    },
    {
      id: 10,
      description: "Runtime Error (SIGABRT)",
    },
    {
      id: 11,
      description: "Runtime Error (NZEC)",
    },
    {
      id: 12,
      description: "Runtime Error (Other)",
    },
    {
      id: 13,
      description: "Internal Error",
    },
    {
      id: 14,
      description: "Exec Format Error",
    },
  ];
  return (
    <>
      <div className="w-full h-1/2 bg-[#1e293b] p-5 rounded-md text-white font-normal text-sm overflow-y-auto">
        {error && JSON.stringify(error)}
        {statusID >= 3 &&
          statuses.filter((stat) => stat.id === statusID)[0].description}
        {outputDetails &&
          outputDetails.map((output, index) => {
            return <p key={index}>{output}</p>;
          })}
      </div>
    </>
  );
};

export default OutputWindow;
