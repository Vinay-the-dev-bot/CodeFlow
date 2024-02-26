import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
// toast({
//   title: "Compiling",
//   status: "loading",
//   duration: null,
//   isClosable: false,
//   toastOptions: {
//     style: {
//       width: "300px", // Set the width
//       height: "100px", // Set the height
//     },
//   },
// });
const LoadingToast = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  useEffect(() => {
    toastIdRef.current = toast({
      title: "Loading",
      status: "loading",
      position: "bottom",
      duration: null,
    });
    return () => {
      toast.close(toastIdRef.current);
    };
  }, []);
};
export default LoadingToast;

//    title: "Compiling",
//       status: "info",
//       isClosable: false,
//       render: () => (
//         <div>
//           <Spinner
//             thickness="4px"
//             speed="0.65s"
//             emptyColor="gray.200"
//             color="blue.500"
//             size="xl"
//           />
//           <p>Compiling...</p>
//         </div>
//       )
// import { useToast } from "@chakra-ui/react";
// import React, { useEffect } from "react";

// function PromisePending() {
//   const toast = useToast();
//   const toastIdRef = React.useRef();
//   useEffect(() => {
//     toastIdRef.current = toast({
//       title: "Compiling",
//       status: "info",
//       duration: null,
//     });
//     return () => {
//       toast.close(toastIdRef.current);
//     };
//   }, []);
// }

// export default PromisePending;
