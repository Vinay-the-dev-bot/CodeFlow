import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import heroImg from "../assets/heroImage2.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  const auth = false;
  return (
    <>
      <Box className="bg-gradient-to-br from-slate-500 via-gray-700 to-zinc-800">
        <Box
          w={{ base: "100%", md: "90%" }}
          m="auto"
          p={{ base: ".6rem 2rem", md: "3rem" }}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          // justifyContent={"start"}
          // alignItems={"center"}
          gap={{ base: "2rem", md: "3rem" }}
          // border={"2px solid white"}
        >
          <Box
            w={{ base: "96%", md: "45%" }}
            m={"auto"}
            mt={{ base: "2rem", md: "" }}
            // border={"1px solid white"}
          >
            <Image src={heroImg} filter={"drop-shadow(0 0 0.75rem #854CE6)"} />
          </Box>
          <Box
            w={{ base: "95%", md: "50%" }}
            m={{ base: "auto", md: "" }}
            mb={{ base: "3rem", md: "" }}
            // border={"1px solid white"}
          >
            <Heading
              as={"h1"}
              className="text-white"
              fontSize={{ base: "2.2rem", md: "2.9rem" }}
              w={{ base: "100%", md: "90%" }}
              filter={"drop-shadow(0 0 0.45rem #854CE6)"}
            >
              The best place to build, test, and discover front-end code.
            </Heading>
            <Text
              className="text-white"
              fontSize={{ base: "1rem", md: "1.4rem" }}
              mt={"1rem"}
            >
              CodePen is a social development environment for front-end
              designers and developers. Build and deploy a website, show off
              your work, build test cases to learn and debug, and find
              inspiration.
            </Text>

            {auth ? (
              <>
                <Link to="/dashboard">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    color={"black"}
                    fontWeight={"bold"}
                    bg={"#a576f5"}
                    p={"1.3rem 3rem"}
                    filter={"drop-shadow(0 0 0.45rem #854CE6)"}
                    // variant={"outline"}
                    _hover={{ bg: "#5629a3", color: "white" }}
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    color={"#eaf0c9"}
                    fontWeight={"bold"}
                    bg={"#a576f5"}
                    p={"1.3rem 3rem"}
                    // filter={"drop-shadow(0 0 0.35rem #854CE6)"}
                    // variant={"outline"}
                    _hover={{ bg: "#5629a3", color: "white" }}
                  >
                    SingUp
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;
