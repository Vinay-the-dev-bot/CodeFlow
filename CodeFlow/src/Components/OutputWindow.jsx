import React from "react";

const OutputWindow = ({ outputDetails }) => {
  return (
    <>
      <div className="w-full h-1/2 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <pre>{outputDetails}</pre> : null}
        {/* {outputDetails ? <>{getOutput()}</> : null} */}
      </div>
    </>
  );
};

export default OutputWindow;
