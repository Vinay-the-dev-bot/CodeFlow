import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import heroImg from "../assets/heroImage2.png";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const auth = useSelector((state) => state.auth.auth);
  return (
    <>
      <Box>
        <Box
          w={{ base: "100%", md: "90%" }}
          m="auto"
          p={{ base: ".6rem 2rem", md: "3rem" }}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "2rem", md: "3rem" }}
        >
          <Box
            w={{ base: "96%", md: "45%" }}
            m={"auto"}
            mt={{ base: "2rem", md: "" }}
          >
            <Image src={heroImg} filter={"drop-shadow(0 0 0.75rem #088395)"} />
          </Box>
          <Box
            w={{ base: "95%", md: "50%" }}
            m={{ base: "auto", md: "" }}
            mb={{ base: "3rem", md: "" }}
          >
            <Heading
              as={"h1"}
              color={"black"}
              fontSize={{ base: "2.2rem", md: "2.9rem" }}
              w={{ base: "100%", md: "90%" }}
              textAlign={{ base: "justify", md: "left" }}
            >
              The best place to build, test, and discover front-end code.
            </Heading>
            <Text
              color={"black"}
              fontSize={{ base: "1rem", md: "1.4rem" }}
              mt={"1rem"}
              textAlign={"justify"}
            >
              CodeFlow is a social development environment for front-end
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
                    bg={"#92C7CF"}
                    p={"1.3rem 3rem"}
                    _hover={{
                      bg: "#AAD7D9",
                      color: "#134232",
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
                    color={"black"}
                    bg={"#92C7CF"}
                    p={"1.3rem 3rem"}
                    _hover={{
                      bg: "#AAD7D9",
                      color: "#134232",
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
      <Box bg={"#AAD7D9"}>
        <Box
          w={{ base: "100%", md: "90%" }}
          m="auto"
          p={{ base: ".6rem 2rem", md: "3rem" }}
          color={"black"}
        >
          <Flex
            gap={{ base: "2rem", md: "3rem" }}
            textAlign={"justify"}
            flexDirection={{ base: "column", md: "row" }}
            m={{ base: "2rem 0rem" }}
          >
            <Box
              p={5}
              border={"1px solid #19212C"}
              w={{ base: "100%", md: "90%" }}
              borderRadius={"1rem"}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                fontSize={{ base: "1.5rem", md: "2rem" }}
              >
                Build & Test
              </Heading>
              <Text color={"black"}>
                Get work done quicker by building out entire projects or
                isolating code to test features and animations.{" "}
              </Text>
            </Box>
            <Box
              p={5}
              border={"1px solid #19212C"}
              w={{ base: "100%", md: "90%" }}
              borderRadius={"1rem"}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                fontSize={{ base: "1.5rem", md: "2rem" }}
              >
                Learn & Discover
              </Heading>
              <Text color={"black"}>
                Want to upgrade your skills and get noticed? Participating in
                CodeFlow Challenges is a great way to try something new.
              </Text>
            </Box>
            <Box
              p={5}
              border={"1px solid #19212C"}
              borderRadius={"1rem"}
              w={{ base: "100%", md: "90%" }}
            >
              <Heading
                textAlign={"center"}
                mb={{ base: 2, md: 5 }}
                fontSize={{ base: "1.5rem", md: "2rem" }}
              >
                Share Your Work
              </Heading>
              <Text color={"black"}>
                Become a part of the most active front-end community in the
                world by sharing work. Presenting at a conference? Show your
                code directly in the browser{" "}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
