// src/components/AnimatedHeading.jsx
import { Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import "@fontsource/press-start-2p";

const MotionHeading = motion(Heading);

const AnimatedHeading = () => (
  <MotionHeading
    initial={{ y: -20 }}
    animate={{ y: 0 }}
    transition={{ duration: 1 }}
  >
    <Text
      mt={4}
      fontSize="4xl"
      fontWeight="bold"
      fontFamily="'Press Start 2P', cursive"
    >
      NLP as a <TypingAnimation text="service" duration={150} />
    </Text>
  </MotionHeading>
);

export default AnimatedHeading;
