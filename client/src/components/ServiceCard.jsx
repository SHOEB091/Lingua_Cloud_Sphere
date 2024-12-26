import { Icon, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import icons from "../utils/icons";
import PropTypes from "prop-types";
import "@fontsource/press-start-2p"; // Import the font

const ServiceCard = ({ title }) => {
  const path = title.toLowerCase();

  return (
    <LinkBox
      as={RouterLink}
      to={`/${path}`}
      p={6}
      bg="gray.700"
      borderRadius="md"
      bgColor={"#012D37"}
      textAlign="center"
      color="white"
      width="250px" // Fixed width for consistency
      height="200px" // Fixed height for consistency
      boxShadow="md"
      transition="all 0.3s"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
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
        background: "linear-gradient(45deg, #0ff, #00f, #0f0)",
        zIndex: "-1",
        opacity: 0,
        transition: "opacity 0.3s",
      }}
      // Center the card within its parent container
      mx="auto"
    >
      <Icon as={CIcon} icon={icons[title]} w={12} h={12} mb={4} />
      <Text
        fontSize="lg"
        fontWeight="bold"
        fontFamily="'Press Start 2P', sans-serif"
      >
        <LinkOverlay as={RouterLink} to={`/${path}`}>
          {title}
        </LinkOverlay>
      </Text>
    </LinkBox>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired, // Ensure 'text' is a required string prop
};

export default ServiceCard;
