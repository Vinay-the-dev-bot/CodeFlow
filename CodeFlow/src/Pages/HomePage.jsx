import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import heroImg from "../assets/heroImage2.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  const auth = false;
  return (
    <>
      <Box
        className="bg-gradient-to-br from-slate-500 via-gray-700 to-zinc-800"
        pb={{ base: "", md: "2.3rem" }}
        // clipPath="polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%)"
      >
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
            <Image src={heroImg} filter={"drop-shadow(0 0 0.75rem #90ee90)"} />
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
              // filter={"drop-shadow(0 0 0.35rem black)"}
              textAlign={{ base: "justify", md: "left" }}
            >
              The best place to build, test, and discover front-end code.
            </Heading>
            <Text
              className="text-white"
              fontSize={{ base: "1rem", md: "1.4rem" }}
              mt={"1rem"}
              textAlign={"justify"}
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
                    color={"white"}
                    // #a576f5
                    bg={"#134232"}
                    p={"1.3rem 3rem"}
                    // filter={"drop-shadow(0 0 0.85rem #854CE6)"}
                    // border={".2px solid white"}
                    _hover={{
                      bg: "#90ee90",
                      color: "#134232",
                      // border: ".2px solid #a576f5",
                    }}
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
                    color={"white"}
                    // #a576f5
                    bg={"#134232"}
                    p={"1.3rem 3rem"}
                    // filter={"drop-shadow(0 0 0.85rem #854CE6)"}
                    // border={".2px solid white"}
                    _hover={{
                      bg: "#90ee90",
                      color: "#134232",
                      // border: ".2px solid #a576f5",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        className="bg-gradient-to-tr from-gray-800 via-stone-600 to-stone-400"
        // clipPath="polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%)"
      >
        <Box
          w={{ base: "100%", md: "90%" }}
          m="auto"
          p={{ base: ".6rem 2rem", md: "3rem" }}
          // border={"2px solid white"}
          color={"white"}
        >
          <Flex
            gap={{ base: "2rem", md: "3rem" }}
            textAlign={"justify"}
            flexDirection={{ base: "column", md: "row" }}
            m={{ base: "2rem 0rem" }}
          >
            <Box
              p={5}
              border={"1px solid white"}
              w={{ base: "100%", md: "90%" }}
              borderRadius={"1rem"}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                // filter={"drop-shadow(0 0 0.35rem black)"}
                // filter={"drop-shadow(0 0 0.25rem #90ee90)"}
              >
                Build & Test
              </Heading>
              <Text color={"#bba67d"}>
                Get work done quicker by building out entire projects or
                isolating code to test features and animations.{" "}
              </Text>
            </Box>
            <Box
              p={5}
              border={"1px solid white"}
              w={{ base: "100%", md: "90%" }}
              borderRadius={"1rem"}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                // filter={"drop-shadow(0 0 0.35rem black)"}
                // filter={"drop-shadow(0 0 0.25rem #90ee90)"}
              >
                Learn & Discover
              </Heading>
              <Text color={"#bba67d"}>
                Want to upgrade your skills and get noticed? Participating in
                CodePen Challenges is a great way to try something new.
              </Text>
            </Box>
            <Box
              p={5}
              border={"1px solid white"}
              borderRadius={"1rem"}
              w={{ base: "100%", md: "90%" }}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                // filter={"drop-shadow(0 0 0.35rem black)"}
                // filter={"drop-shadow(0 0 0.25rem #90ee90)"}
              >
                Share Your Work
              </Heading>
              <Text color={"#bba67d"}>
                Become a part of the most active front-end community in the
                world by sharing work. Presenting at a conference? Show your
                code directly in the browser{" "}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;
