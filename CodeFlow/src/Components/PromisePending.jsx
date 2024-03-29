import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

function PromisePending() {
  const toast = useToast();
  const toastIdRef = React.useRef();
  useEffect(() => {
    toastIdRef.current = toast({
      title: "Compiling",
      status: "info",
      duration: null,
    });
    return () => {
      toast.close(toastIdRef.current);
    };
  }, []);
}

export default PromisePending;
