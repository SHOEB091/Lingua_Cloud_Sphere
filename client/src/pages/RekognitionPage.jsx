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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import useRecognition from "../hooks/useRekognition";
import { LoadingBouncyComponent } from "../components/LoadingComponent";
import { FacialAnalysisResult } from "../components/FacialAnalysisResult";
import { ObjectDetectionResult } from "../components/ObjectDetectionResult";
import { CelebrityFacesResult } from "../components/CelebrityFacialAnalysisResult";
import { useDropzone } from "react-dropzone";

const steps = [
  { title: "Upload Image", description: "Upload an image file" },
  { title: "Choose Operation", description: "Select an analysis operation" },
  { title: "Result", description: "View the analysis result" },
];

const RecognitionPage = () => {
  const { uploading, error, result, loading, recognize } = useRecognition();
  const [imageFile, setImageFile] = useState(null);
  const [operation, setOperation] = useState("");
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = async () => {
    if (activeStep === 1 && operation) {
      await recognize(imageFile, operation);
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
    setImageFile(null);
    setOperation("");
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

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
      if (activeStep === 0) {
        setActiveStep(1); // Automatically go to step 1 after uploading
      }
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
        Image Rekognition 📸
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
            <Select
              placeholder="Select operation"
              onChange={(e) => setOperation(e.target.value)}
              value={operation}
            >
              <option value="facial_analysis">Facial Analysis</option>
              <option value="object_detection">Object Detection</option>
              <option value="celebrity_recognition">
                Celebrity Recognition
              </option>
            </Select>
          )}
          {activeStep === 2 && result && operation === "facial_analysis" && (
            <FacialAnalysisResult image={imageFile} result={result} />
          )}
          {activeStep === 2 && result && operation === "object_detection" && (
            <ObjectDetectionResult image={imageFile} result={result} />
          )}
          {activeStep === 2 &&
            result &&
            operation === "celebrity_recognition" && (
              <CelebrityFacesResult image={imageFile} celebrityFaces={result} />
            )}
          {error && (
            <Text mt={4} color="red.500">
              Error: {error}
            </Text>
          )}
          {uploading && activeStep === 1 && (
            <Progress size="xs" isIndeterminate mb={4} />
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
              isDisabled={
                loading ||
                (activeStep === 0 && !imageFile) ||
                (activeStep === 1 && !operation)
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

export default RecognitionPage;
