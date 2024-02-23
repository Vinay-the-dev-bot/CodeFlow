import React from "react";

const OutputWindow = ({ outputDetails }) => {
  return (
    <>
      <div className="w-full h-1/2 bg-[#1e293b] p-5 rounded-md text-white font-normal text-sm overflow-y-auto">
        {/* {outputDetails ? <pre>{`${outputDetails}`}</pre> : null} */}
        {/* {outputDetails ? <>{getOutput()}</> : null} */}
        {outputDetails.output &&
          outputDetails.output.map((output, index) => {
            return <p key={index}>{output.output}</p>;
          })}
      </div>
    </>
  );
};

export default OutputWindow;
