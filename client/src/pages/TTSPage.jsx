import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Select,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import useTts from "../hooks/useTts"; // Import the useTts hook
import { useState } from "react";
import { LoadingBouncyComponent } from "../components/LoadingComponent";

const steps = [
  { title: "Your Text", description: "Enter text to convert to audio" },
  { title: "Your Voice Agent", description: "Select the Voice Agent" },
  { title: "Result", description: "View the Conversion result" },
];

const TTSPage = () => {
  const { audio, loading, error, speech, setAudio } = useTts(); // Use the useTts hook
  const [textToTranslate, setTextToTranslate] = useState("");
  const [toLanguage, setToLanguage] = useState(""); // Use this to select the voice agent
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = () => {
    if (activeStep === 0 && textToTranslate) {
      setActiveStep(1);
    } else if (activeStep === 1 && toLanguage) {
      speech(textToTranslate, toLanguage); // Call the speech function from useTts
      setActiveStep(2);
    } else if (activeStep === 2) {
      resetForm(); // Reset the form when "Done" is clicked
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetForm = () => {
    setTextToTranslate("");
    setToLanguage("");
    setAudio(""); // Clear the audio state
    setActiveStep(0); // Reset to the first step
  };

  const getButtonText = () => {
    if (loading) {
      return <LoadingBouncyComponent />;
    } else if (activeStep === 2) {
      return "Done";
    }
    return "Next";
  };

  return (
    <Box
      p={8}
      bg="gray.800"
      minH="70vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        as="h1"
        size="xl"
        mb={6}
        color="white"
        fontFamily={"'Press Start 2P', cursive"}
      >
        Text 💬 to Speech 🔊
      </Heading>
      <Box
        p={6}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        maxWidth="80%"
        w="100%"
        position="relative"
        border="2px solid"
        borderColor="teal.400"
      >
        <Stepper index={activeStep} mb={4}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Flex direction="column">
          {activeStep === 0 && (
            <Input
              mb={4}
              placeholder="Enter text to convert"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
          )}
          {activeStep === 1 && (
            <Select
              placeholder="Select Voice Agent"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              mb={4}
            >
              {/* List of options as before */}
              <option value="Matthew">Matthew</option>
              <option value="Joanna">Joanna</option>
              <option value="Ivy">Ivy</option>
              <option value="Kendra">Kendra</option>
              <option value="Kimberly">Kimberly</option>
              <option value="Salli">Salli</option>
              <option value="Joey">Joey</option>
              <option value="Justin">Justin</option>
              <option value="Kevin">Kevin</option>
              <option value="Raveena">Raveena</option>
              <option value="Nicole">Nicole</option>
              <option value="Russell">Russell</option>
              <option value="Amy">Amy</option>
              <option value="Brian">Brian</option>
              <option value="Emma">Emma</option>
              <option value="Aditi">Aditi</option>
              <option value="Hans">Hans</option>
              <option value="Marlene">Marlene</option>
              <option value="Vicki">Vicki</option>
              <option value="Conchita">Conchita</option>
              <option value="Enrique">Enrique</option>
              <option value="Miguel">Miguel</option>
              <option value="Penelope">Penelope</option>
              <option value="Chantal">Chantal</option>
              <option value="Celine">Celine</option>
              <option value="Mathieu">Mathieu</option>
              <option value="Dora">Dora</option>
              <option value="Karl">Karl</option>
              <option value="Carla">Carla</option>
              <option value="Giorgio">Giorgio</option>
              <option value="Mizuki">Mizuki</option>
              <option value="Takumi">Takumi</option>
              <option value="Seoyeon">Seoyeon</option>
              <option value="Liv">Liv</option>
              <option value="Lotte">Lotte</option>
              <option value="Ruben">Ruben</option>
              <option value="Ewa">Ewa</option>
              <option value="Jacek">Jacek</option>
              {/* Add more voice options as needed */}
            </Select>
          )}
          {activeStep === 2 && audio && (
            <Box
              p={4}
              bg="gray.100"
              borderRadius="md"
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <audio controls>
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Box>
          )}
          {error && (
            <Text mt={4} color="red.500">
              Error: {error.message}
            </Text>
          )}
          <Flex justifyContent="space-between">
            <Button
              onClick={handleBackStep}
              isDisabled={activeStep === 0 || loading}
              mr={4}
            >
              Back
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleNextStep}
              isDisabled={
                loading ||
                (activeStep === 0 && !textToTranslate) ||
                (activeStep === 1 && !toLanguage)
              }
              _hover={{ opacity: "0.8" }}
            >
              {getButtonText()}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default TTSPage;
