import { useState } from "react";
import { Box, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import AnimatedHeading from "../components/AnimatedHeading";
import { LoadingBouncyComponent } from "../components/LoadingComponent"; // Import your loading component
import "@fontsource/press-start-2p";

const services = [
  { title: "Translation" },
  { title: "SST" },
  { title: "TTS" },
  { title: "Rekognition" },
  { title: "Textract" },
  { title: "Comphrend" },
];

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceCardClick = (title) => {
    setIsLoading(true);
    // Simulate delay before navigating or loading content
    setTimeout(() => {
      history.push(`/${title.toLowerCase()}`);
      setIsLoading(false);
    }, 1000); // Adjust delay time as needed
  };

  return (
    <MotionBox
      p={4} // Adjust padding for smaller screens
      bg="gray.800"
      color="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <MotionFlex justifyContent="center" mb={4}>
        {" "}
        {/* Adjust margin for smaller screens */}
        <AnimatedHeading />
      </MotionFlex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {services.map((service) => (
          <MotionBox
            key={service.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleServiceCardClick(service.title)}
            cursor="pointer"
          >
            <ServiceCard title={service.title} p={4} textAlign="center" />
          </MotionBox>
        ))}
      </SimpleGrid>
      {isLoading && <LoadingBouncyComponent />}{" "}
      {/* Show loading component if isLoading is true */}
    </MotionBox>
  );
};

export default HomePage;
