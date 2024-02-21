import React from "react";
import { Grid, Box, GridItem, Heading, Text } from "@chakra-ui/react";

import FacebookIcon from "@mui/icons-material/Facebook";
// import FacebookIcon from '@mui/icons-material/Facebook';
// import "./Footer.css";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      className="n-footer px-6 flex flex-col items-center justify-center "
      bg={"#19212C"}
      color={"white"}
      //   border={"1px solid #854CE6"}
      //   _hover={{ color: "#854CE6" }}
    >
      <Grid
        // border={"1px solid #854CE6"}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: 2, md: 8 }}
        w={{ base: "100%", md: "80%" }}
        // mt={{ base: 6, md: 0 }}
      >
        <GridItem
          //   border={"1px solid #854CE6"}
          className="flex flex-col justify-start mt-8 "
          gap={{ base: 0, md: 1 }}
          //   w="100%"
          //   h={{ base: "auto", lg: "auto" }}
        >
          <Heading fontSize={{ base: "1.6rem", md: "2.2rem" }}>Menu</Heading>
          <Link to="/">
            <Text mt={2} color={"white"} _hover={{ color: "#854CE6" }}>
              Home
            </Text>
          </Link>
          <Link to="/about">
            <Text color={"white"} _hover={{ color: "#854CE6" }}>
              About us
            </Text>
          </Link>
          <Link to="/html">
            <Text color={"white"} _hover={{ color: "#854CE6" }}>
              {" "}
              HTML Compiler
            </Text>
          </Link>
          <Link to="/judger">
            <Text color={"white"} _hover={{ color: "#854CE6" }}>
              {" "}
              Judger
            </Text>
          </Link>
        </GridItem>
        <GridItem
          className=" flex flex-col justify-start  mt-8"
          w="100%"
          //   border={"1px solid #854CE6"}
          gap={1}
          //   h={{ base: "40", lg: "60" }}
        >
          <Heading fontSize={{ base: "1.6rem", md: "2.2rem" }}>
            Need Help ?
          </Heading>
          <Link to="#">
            <Text color={"white"} _hover={{ color: "#854CE6" }} mt={2}>
              Code Q&A's
            </Text>
          </Link>
          <Link to="https://www.termsfeed.com/blog/terms-conditions-url/">
            <Text color={"white"} _hover={{ color: "#854CE6" }}>
              {" "}
              Terms of use
            </Text>
          </Link>
          <Link to="https://www.termsfeed.com/blog/terms-conditions-url/">
            <Text color={"white"} _hover={{ color: "#854CE6" }}>
              {" "}
              Privacy Policy
            </Text>
          </Link>
        </GridItem>
        <GridItem
          className="flex flex-col justify-start mt-8"
          w="100%"
          //   border={"1px solid #854CE6"}
          gap={1}
          //   h={{ base: "40", sm: "60", md: "40", lg: "60" }}
        >
          <Heading fontSize={{ base: "1.6rem", md: "2.2rem" }}>
            Contacts
          </Heading>
          <Text mt={2}>+91 828*74345*</Text>
          <Text>49 Greenpark New Delhi</Text>
          <Text>codeflow@gmail.com</Text>
        </GridItem>
        <GridItem
          className="flex flex-col justify-start mt-8"
          w="100%"
          //   border={"1px solid #854CE6"}
          gap={1}
          //   h={{ base: "40", lg: "60" }}
        >
          <Heading fontSize={{ base: "1.6rem", md: "2.2rem" }}>
            Follow us on
          </Heading>
          <Box className="flex gap-4 justify-start" mt={2}>
            <a href="https://www.facebook.com/OfficialSGRH" target="display">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/sgrhindia" target="display">
              {" "}
              <Twitter />
            </a>
            <a href="https://www.instagram.com/sgrhindia/">
              {" "}
              <Instagram />{" "}
            </a>
          </Box>
        </GridItem>
      </Grid>
      <Box
        className="flex items-center justify-end "
        w={{ base: "100%", md: "80%" }}
        // border={"1px solid white"}
        mt={2}
      >
        <Text p={"1rem 0"}>© Copy right 2023 CodeFlow</Text>
      </Box>
    </Box>
  );
};

export default Footer;