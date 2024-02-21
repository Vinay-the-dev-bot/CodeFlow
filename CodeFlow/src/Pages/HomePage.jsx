import { Box, Heading, Image, Text } from "@chakra-ui/react";
import heroImg from "../assets/heroimage.jpeg";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <>
      <Box className="bg-gradient-to-br from-slate-500 via-gray-700 to-zinc-800">
        <Box
          w={{ base: "100%", md: "90%" }}
          m="auto"
          p={{ base: ".6rem 2rem", md: "3rem" }}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          // justifyContent={"center"}
          alignItems={"center"}
          gap="3rem"
          // border={"2px solid white"}
        >
          <Box w={{ base: "96%", md: "45%" }} m={"auto"}>
            <Image src={heroImg} />
          </Box>
          <Box w={{ base: "95%", md: "50%" }} m={{ base: "auto", md: "" }}>
            <Heading
              as={"h1"}
              className="text-white"
              fontSize={{ base: "2.2rem", md: "2.9rem" }}
              w={{ base: "100%", md: "90%" }}
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
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;
