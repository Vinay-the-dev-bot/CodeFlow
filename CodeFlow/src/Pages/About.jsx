import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={"2rem 4rem"}>
      <Heading as="h3" size="lg" mb={4}>
        About CodeFlow
      </Heading>

      <Box bg="gray.100" p={6} borderRadius="md" mb={4}>
        <Heading as="h2" size="xl" mb={4}>
          Our Story:
        </Heading>
        <Text>
          CodeFlow is the brainchild of a team of passionate developers who came
          together during a Construct Week, a dedicated period for intensive
          collaboration and innovation. Fueled by a shared vision to create a
          cutting-edge collaborative coding platform, our journey began with a
          commitment to push the boundaries of what's possible in the world of
          coding.
        </Text>
      </Box>

      <Box
        bg="gray.100"
        p={4}
        borderRadius="md"
        mb={4}
        display={"flex"}
        flexDirection={"column"}
        gap={4}
      >
        <Heading as="h2" size="xl" mb={4}>
          Meet the Team:
        </Heading>
        <Text>
          <strong>Vinaygouda Meti:</strong> Full Stack Developer and architect
          of CodeFlow's advanced functionalities. Vinaygouda's expertise in
          coding challenges and his innovative spirit drive the development of
          features that challenge and inspire skilled coders.
        </Text>
        <Text>
          <strong>Geetesh Mehuria:</strong> Full Stack Designer with a knack for
          crafting intuitive and visually stunning interfaces. Geetesh's designs
          not only enhance the user experience but also reflect our commitment
          to making CodeFlow accessible and engaging for all.
        </Text>
        <Text>
          <strong>Aishwarya Lohakare:</strong> Backend Developer extraordinaire,
          Aishwarya lays the foundation for CodeFlow's seamless performance and
          scalability. With her expertise in Node.js and database management,
          Aishwarya ensures that the platform remains robust even under heavy
          usage.
        </Text>
        <Text>
          <strong>Deepak Purohit:</strong> Full Stack Developer and
          Authentication Wizard, Deepak specializes in deployment technologies
          and server management. He played a pivotal role in implementing the
          login and signup functionality using JWT (JSON Web Tokens), ensuring
          secure authentication for CodeFlow users.
        </Text>
      </Box>

      <Box bg="gray.100" p={4} borderRadius="md" mb={4}>
        <Heading as="h2" size="xl" mb={4}>
          Our Mission:
        </Heading>
        <Text>
          At CodeFlow, we're on a mission to democratize coding by providing a
          platform where collaboration, learning, and creativity thrive. We
          believe that coding is not just about writing lines of code but about
          building connections, sharing knowledge, and fostering innovation.
        </Text>
      </Box>

      <Box bg="gray.100" p={4} borderRadius="md" mb={4}>
        <Heading as="h2" size="xl" mb={4}>
          Why CodeFlow?
        </Heading>
        <Text>
          CodeFlow isn't just another coding platform; it's a community-driven
          ecosystem designed to empower coders of all levels. Whether you're a
          seasoned developer looking for new challenges or a beginner eager to
          learn, CodeFlow offers the tools and resources you need to succeed.
        </Text>
        <Text>
          Join us as we revolutionize the way coders work, learn, and
          collaborate. Welcome to the future of coding—welcome to CodeFlow.
        </Text>
      </Box>
    </Box>
  );
};

export default About;
