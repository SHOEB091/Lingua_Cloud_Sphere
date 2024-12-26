// src/pages/TestingBackendPage.js
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
import { useState } from "react";
import useComprehend from "../hooks/useComprehend"; // Import the useComprehend hook
import { LoadingBouncyComponent } from "../components/LoadingComponent";
import PieChart from "../components/PieChart"; // Import the PieChart component

const steps = [
  { title: "Your Text", description: "Enter text to analyze" },
  { title: "Choose Operation", description: "Select the operation" },
  { title: "Result", description: "View the analysis result" },
];

const ComprehendPage = () => {
  const { result, loading, error, comprehend } = useComprehend(); // Use the useComprehend hook
  const [text, setText] = useState("");
  const [operation, setOperation] = useState("");
  const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

  const handleNextStep = () => {
    if (activeStep === 0 && text) {
      setActiveStep(1);
    } else if (activeStep === 1 && operation) {
      comprehend(text, operation); // Call the comprehend function from useComprehend
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
    setText("");
    setOperation("");
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

  const renderResult = () => {
    console.log("Result", result);
    if (operation === "sentiment" && result) {
      const sentimentScores = {
        POSITIVE: (result.SentimentScore?.Positive || 0) * 100,
        NEGATIVE: (result.SentimentScore?.Negative || 0) * 100,
        MIXED: (result.SentimentScore?.Mixed || 0) * 100,
        NEUTRAL: (result.SentimentScore?.Neutral || 0) * 100,
      };

      // Replace NaN values with zero
      for (const key in sentimentScores) {
        if (isNaN(sentimentScores[key])) {
          sentimentScores[key] = 0;
        }
      }

      // Prepare chart data
      const chartData = {
        labels: Object.keys(sentimentScores),
        datasets: [
          {
            data: Object.values(sentimentScores),
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)", // Positive
              "rgba(255, 99, 132, 0.6)", // Negative
              "rgba(201, 203, 207, 0.6)", // Mixed
              "rgba(255, 205, 86, 0.6)", // Neutral
            ],
          },
        ],
      };

      // Return the PieChart component with the prepared chart data
      return <PieChart data={chartData} />;
    }

    if (
      operation === "language" &&
      Array.isArray(result) &&
      result.length > 0
    ) {
      const chartData = {
        labels: result.map((lang) => lang.LanguageCode),
        datasets: [
          {
            data: result.map((lang) => lang.Score),
            backgroundColor: result.map(
              () =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
            ),
          },
        ],
      };

      return <PieChart data={chartData} />;
    }

    if (operation === "entities" && result) {
      return (
        <Flex wrap="wrap">
          {result.map((entity, index) => (
            <Box key={index} p={4} m={2} bg="teal.100" borderRadius="md">
              <Text>Type: {entity.Type}</Text>
              <Text>Text: {entity.Text}</Text>
              <Text>Score: {entity.Score}</Text>
            </Box>
          ))}
        </Flex>
      );
    }

    return null;
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
        Comprehend 🧠
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
              placeholder="Enter text to analyze"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
          {activeStep === 1 && (
            <Select
              placeholder="Select Operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              mb={4}
            >
              <option value="language">Language Detection</option>
              <option value="sentiment">Sentiment Analysis</option>
              <option value="entities">Entity Recognition</option>
            </Select>
          )}
          {activeStep === 2 && result && (
            <Box
              p={4}
              bg="gray.100"
              borderRadius="md"
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {renderResult()}
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
                (activeStep === 0 && !text) ||
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

export default ComprehendPage;
