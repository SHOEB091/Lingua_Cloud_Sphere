import { Box, Heading, Textarea, Text, Progress } from "@chakra-ui/react";

const TextExtractionResult = ({ imageFile, textResult, loading, error }) => {
  return (
    <Box>
      <Box
        p={4}
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        textAlign="center"
      >
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Box>
      {loading && <Progress size="xs" isIndeterminate mt={4} />}
      {error && (
        <Text mt={4} color="red.500">
          Extraction Error: {error}
        </Text>
      )}
      {textResult && (
        <Box mt={4}>
          <Heading as="h3" size="md" mb={2}>
            Extracted Text:
          </Heading>
          <Textarea
            value={textResult}
            readOnly
            height="300px"
            resize="vertical"
          />
        </Box>
      )}
    </Box>
  );
};

export default TextExtractionResult;
