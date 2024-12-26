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
import useSst from "../hooks/useSst";
import { LoadingBouncyComponent } from "../components/LoadingComponent";
import { useDropzone } from "react-dropzone";
import { CopyIcon } from "@chakra-ui/icons";

const steps = [
  { title: "Your Audio", description: "Upload an audio file" },
  { title: "Processing", description: "Converting audio to text" },
  { title: "Result", description: "View the Conversion result" },
];

const SSTPage = () => {
  const { loading, error, result, uploadAndConvert } = useSst();
  const [audioFile, setAudioFile] = useState(null);
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const onDrop = (acceptedFiles) => {
    setAudioFile(acceptedFiles[0]);
  };

  const handleNextStep = async () => {
    if (activeStep === 0 && audioFile) {
      await uploadAndConvert(audioFile);
      setActiveStep(1);
    } else if (activeStep === 1 && result) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      resetForm();
    }
  };

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetForm = () => {
    setAudioFile(null);
    setActiveStep(0);
  };

  const getButtonText = () => {
    if (loading) {
      return <LoadingBouncyComponent />;
    } else if (activeStep === 2) {
      return "Done";
    }
    return "Next";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/*",
    multiple: false,
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
        Speech 🎤 to Text 📄
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
              {...getRootProps({ className: "dropzone" })}
              border="2px dashed teal"
              borderRadius="md"
              p={4}
              mb={4}
              textAlign="center"
            >
              <input {...getInputProps()} />
              {audioFile ? (
                <Text>File selected: {audioFile.name}</Text>
              ) : (
                <Text>
                  Drag & drop an audio file here, or click to select one
                </Text>
              )}
            </Box>
          )}
          {activeStep === 1 && loading && (
            <Progress size="xs" isIndeterminate mb={4} />
          )}
          {activeStep === 2 && result && (
            <Box
              p={4}
              bg="gray.100"
              borderRadius="md"
              mb={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Text mb={4}>{result}</Text>
              <Button
                leftIcon={<CopyIcon />}
                colorScheme="teal"
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </Button>
            </Box>
          )}
          {error && (
            <Text mt={4} color="red.500">
              Error: {error}
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
                (activeStep === 0 && !audioFile) ||
                (activeStep === 1 && !result)
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

export default SSTPage;
