import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaFigma } from "react-icons/fa";
import { SiCanva } from "react-icons/si";

const Footer = () => (
  <Box as="footer" bg="gray.800" color="white" p={10} mt={0}>
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
      {/* Legal links centered */}
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        mb={{ base: 4, md: 0 }}
        alignItems="center"
      >
        <Link href="about" mx={2} color="teal.300">
          Privacy Policy
        </Link>
        <Link href="about" mx={2} color="teal.300">
          Terms of Service
        </Link>
        <Link href="about" mx={2} color="teal.300">
          Copyright
        </Link>
      </Flex>

      {/* Spacer */}
      <Box
        flex="1"
        textAlign="center"
        display={{ base: "none", md: "block" }}
      />

      <Flex justifyContent="center" alignItems="center">
        <Link
          href="https://github.com/SHOEB091"
          target="_blank"
          mx={2}
          color="teal.300"
        >
          <FaGithub size={35} />
        </Link>
        <Link
          href="https://www.figma.com/proto/EJiUE8F6vRP5XqohRvDAyM/Untitled?node-id=2-3&t=CEx01Wdrpr94FleB-1"
          target="_blank"
          mx={2}
          color="teal.300"
        >
          <FaFigma size={35} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/shoeb-iqbal-a02191221/"
          target="_blank"
          mx={2}
          color="teal.300"
        >
          <FaLinkedin size={35} />
        </Link>
        <Link
          href="https://www.canva.com/design/DAGKorfbuz4/zS8CkDYmGJ6M6q3VyB8Y8Q/view?utm_content=DAGKorfbuz4&utm_campaign=designshare&utm_medium=link&utm_source=editor"
          target="_blank"
          mx={2}
          color="teal.300"
        >
          <SiCanva size={35} />
        </Link>
      </Flex>
    </Flex>
    <Text fontSize="sm" textAlign="center" mt={4}>
      © 2024 LCS. All Rights Reserved.
    </Text>
  </Box>
);

export default Footer;
