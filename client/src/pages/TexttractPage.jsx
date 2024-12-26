import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Progress,
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
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import useTextract from "../hooks/useTextract";
import TextExtractionResult from "../components/TextExtractionResult";

const steps = [
  { title: "Upload Image", description: "Upload an image file" },
  { title: "Parsing Result", description: "View the extraction result" },
];

const TextExtractPage = () => {
  const { textResult, loading, error, extractText, uploading, uploadError } =
    useTextract();
  const [imageFile, setImageFile] = useState(null);
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = async () => {
    if (activeStep === 1) {
      resetForm();
    } else if (imageFile) {
      await extractText(imageFile, "png", "TextractUploads");
      setActiveStep(activeStep + 1);
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetForm = () => {
    setImageFile(null);
    setActiveStep(0);
  };

  const getButtonText = () => {
    if (loading) {
      return "Loading...";
    } else if (activeStep === 1) {
      return "Done";
    }
    return "Next";
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
    },
  });

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
        Text Extraction 📄
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
            <Box
              p={4}
              border="2px dashed"
              borderColor={isDragActive ? "teal.500" : "gray.300"}
              borderRadius="md"
              {...getRootProps()}
              cursor="pointer"
              textAlign="center"
            >
              <input {...getInputProps()} />
              <Text color="gray.500">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag 'n' drop an image here, or click to select one"}
              </Text>
            </Box>
          )}
          {activeStep === 1 && (
            <TextExtractionResult
              imageFile={imageFile}
              textResult={textResult}
              loading={loading}
              error={error}
            />
          )}
          {uploadError && (
            <Text mt={4} color="red.500">
              Upload Error: {uploadError}
            </Text>
          )}
          <Flex justifyContent="space-between" mt={4}>
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
              isDisabled={loading || (activeStep === 0 && !imageFile)}
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

export default TextExtractPage;
