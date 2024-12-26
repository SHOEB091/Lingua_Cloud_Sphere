import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import "@fontsource/press-start-2p";
import Logo from "../assets/Logo.png"; // Adjust the path if needed

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box p={4} bgColor="gray.800" position="relative">
      <Stack spacing={6} mx={"auto"} maxW={"lg"} py={8} px={4}>
        <Flex justify="center" mb={4}>
          <img
            src={Logo}
            alt="Lingua Cloud Sphere Logo"
            style={{ maxWidth: "150px" }}
          />
        </Flex>
        <Heading
          color={"white"}
          fontSize={"4xl"}
          textAlign={"center"}
          fontFamily={"'Press Start 2P', cursive"}
        >
          Lingua-Cloud-Sphere
        </Heading>
        <Text color={"white"} fontSize={"md"} fontFamily={"cursive"} mt={4}>
          Lingua-Cloud-Sphere is an advanced cloud-based Natural Language
          Processing (NLP) platform designed to provide scalable, efficient, and
          comprehensive text analysis, sentiment analysis, and language
          translation services. Harnessing the power of AWS Cognitive Services,
          Lingua-Cloud-Sphere offers a unified API that seamlessly integrates
          various AWS and NLP services, simplifying the development and
          deployment of sophisticated NLP applications.
          <br />
          <br />
          Our platform enables developers to access and utilize a broad array of
          NLP functionalities through a high-level API, removing the
          complexities of infrastructure management and maintenance. Whether
          through a user-friendly portal or direct API interactions, developers
          can easily integrate NLP capabilities into their applications,
          streamlining the process of implementing text and sentiment analysis,
          as well as language translation.
          <br />
          <br />
          Lingua-Cloud-Sphere not only integrates various NLP services but also
          offers custom solutions for each service, available as part of the
          platforms free tier. These custom solutions provide an alternative to
          the standard AWS offerings, giving developers the flexibility to
          choose between Lingua-Cloud-Spheres custom providers and traditional
          AWS services. For instance, in the case of text-to-speech (TTS)
          services, developers can opt for Lingua-Cloud-Spheres proprietary TTS
          solution in the free tier or switch to AWS Polly as needed. This
          approach extends to other NLP services such as text analysis,
          sentiment analysis, and language translation, ensuring that developers
          have access to versatile, cost-effective options while maintaining the
          ability to scale and adapt to their specific requirements. By
          providing these custom solutions, Lingua-Cloud-Sphere enhances the
          overall value and usability of its platform, empowering developers to
          leverage NLP capabilities without incurring additional costs or
          complexities.
          <br />
          <br />
          Lingua-Cloud-Sphere aims to democratize access to advanced NLP
          technologies, enabling developers to build intelligent applications
          without the overhead of managing complex infrastructure. By providing
          a high-level API and custom solutions, Lingua-Cloud-Sphere empowers
          businesses to leverage the full potential of NLP, driving innovation
          and enhancing user experiences. It brings several advantages by
          offering custom NLP solutions within a unified API framework. These
          advantages include simplified integration of NLP capabilities,
          cost-effective access through a free tier, and the flexibility to
          choose between custom providers and AWS services. This versatility can
          be applied in various domains such as customer service, where
          sentiment analysis can improve response strategies; in content
          creation and localization, where language translation services can
          enhance global reach; and in accessibility features, where
          text-to-speech services can make applications more inclusive. By
          providing these adaptable and scalable NLP solutions,
          Lingua-Cloud-Sphere empowers developers to build intelligent
          applications across diverse fields, including e-commerce, social
          media, healthcare, and education, without the burden of managing
          complex backend infrastructure.
        </Text>
        <Heading
          color={"white"}
          fontSize={"4xl"}
          textAlign={"center"}
          fontFamily={"'Press Start 2P', cursive"}
          mt={8}
        >
          Pricing
        </Heading>
        <Text
          color={"white"}
          fontSize={"md"}
          fontFamily={"cursive"}
          textAlign={"center"}
          mt={2}
        >
          Pricing coming soon
        </Text>
      </Stack>

      {/* Slider Component */}
      <Box
        position="fixed"
        top={scrollY + 50} // Adjust this value to control vertical offset
        right={4}
        zIndex={10}
        p={4}
        borderRadius="md"
        bgColor="gray.700"
        boxShadow="md"
      >
        <Slider
          defaultValue={30}
          min={0}
          max={100}
          step={1}
          aria-label="slider-ex-1"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Box>
  );
};

export default AboutPage;
