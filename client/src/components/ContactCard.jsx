import {
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";

const ContactCard = ({ name, avatar, linkedin, github }) => {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      _hover={{
        bg: "gray.600",
        transform: "scale(1.05)",
        boxShadow: "0 0 20px #0ff", // Neon glow effect
        _before: {
          opacity: 1,
        },
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: "-4px",
        right: "-4px",
        bottom: "-4px",
        left: "-4px",
        borderRadius: "md",
        background: "linear-gradient(45deg, #0ff, #00f,#0f0fbc)",
        zIndex: "-1",
        opacity: 0,
        transition: "opacity 0.3s",
      }}
    >
      <Avatar
        size={"xl"}
        src={avatar}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
      />
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {name}
      </Heading>
      <Link href={linkedin} isExternal color={"black.400"} mt={2}>
        <Flex alignItems="center" justifyContent="center">
          <FaLinkedin />
          <Text ml={2}>LinkedIn</Text>
        </Flex>
      </Link>
      <Link href={github} isExternal color={"black.400"} mt={2}>
        <Flex alignItems="center" justifyContent="center">
          <FaGithub />
          <Text ml={2}>Github</Text>
        </Flex>
      </Link>
    </Box>
  );
};

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
};

export { ContactCard };
