import { Box, Flex, Link, Button, Image, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import PropTypes from "prop-types";

const Header = () => (
  <Box as="header" bg="gray.800" color="white" p={4}>
    <Flex align="center" maxW="1200px" mx="auto">
      {/* Logo */}
      <Box fontSize="xl" fontWeight="bold">
        <Link as={RouterLink} to="/" mx={3}>
          <Image boxSize="100px" objectFit="cover" src={Logo} alt="Logo" />
        </Link>
      </Box>
      <Spacer />
      <Spacer />
      {/* Navigation */}
      <Flex as="nav" align="center" flexGrow={5} justify="center">
        <NavLinkButton to="/" text="Home" />
        <NavLinkButton to="/about" text="About" />
        <NavLinkButton to="/contact" text="Contact" />
        <NavLinkButton
          to="https://documenter.getpostman.com/view/26811368/2sA3e5d86L#1b122ed4-59d4-412d-bafe-28e4931bdb72"
          text="API"
        />
      </Flex>

      {/* Buttons */}
      <Flex align="center">
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="teal"
          variant="outline"
          mr={4}
          size="lg"
        >
          Log in
        </Button>
        <Button as={RouterLink} to="/signup" colorScheme="teal" size="lg">
          Sign up
        </Button>
      </Flex>
    </Flex>
  </Box>
);

const NavLinkButton = ({ to, text }) => (
  <Button
    as={RouterLink}
    to={to}
    mx={3}
    fontSize="2xl"
    fontWeight="bold"
    fontFamily="'Anton', sans-serif"
    colorScheme="gray"
    variant="link"
    _hover={{
      textDecoration: "none",
      color: "teal.300",
    }}
  >
    {text}
  </Button>
);

NavLinkButton.propTypes = {
  to: PropTypes.string.isRequired, // Ensure 'to' is a required string prop
  text: PropTypes.string.isRequired, // Ensure 'text' is a required string prop
};

export default Header;
