import { Box, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";

const ObjectDetectionResult = ({ image, result }) => {
  const [hoveredBoundingBoxIndex, setHoveredBoundingBoxIndex] = useState(null);

  const handleBoundingBoxMouseEnter = (index) => {
    setHoveredBoundingBoxIndex(index);
  };

  const handleBoundingBoxMouseLeave = () => {
    setHoveredBoundingBoxIndex(null);
  };

  return (
    <Box
      p={4}
      bg="gray.100"
      borderRadius="md"
      mb={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
      maxWidth="600px"
      mx="auto"
    >
      <Box position="relative" display="inline-block">
        <img
          src={URL.createObjectURL(image)}
          alt="Analysis"
          style={{ maxWidth: "100%", display: "block" }}
        />
        {result.map((label, labelIndex) =>
          label.Instances.map((instance, instanceIndex) => {
            const { BoundingBox } = instance;
            const { Width, Height, Left, Top } = BoundingBox;
            const isHovered =
              hoveredBoundingBoxIndex === labelIndex * 1000 + instanceIndex; // Unique index for each instance

            return (
              <Box
                key={`${labelIndex}-${instanceIndex}`}
                position="absolute"
                border="2px solid green"
                style={{
                  width: `${Width * 100}%`,
                  height: `${Height * 100}%`,
                  left: `${Left * 100}%`,
                  top: `${Top * 100}%`,
                }}
                onMouseEnter={() =>
                  handleBoundingBoxMouseEnter(labelIndex * 1000 + instanceIndex)
                }
                onMouseLeave={handleBoundingBoxMouseLeave}
              >
                {isHovered && (
                  <Tooltip
                    label={`Label: ${label.Name}, Confidence: ${instance.Confidence.toFixed(
                      2
                    )}%`}
                    placement="top"
                    isOpen={true}
                    bg="blue.600"
                    color="white"
                    position="absolute"
                    left={`${(Left + Width / 2) * 100}%`}
                    top={`${(Top + Height / 2) * 100}%`}
                    transform="translate(-50%, -100%)"
                  >
                    <Box
                      position="absolute"
                      bg="rgba(0, 0, 0, 0.75)"
                      color="white"
                      padding="2px 4px"
                      borderRadius="3px"
                      pointerEvents="none"
                      zIndex="10"
                      transform="translate(-50%, -100%)"
                    >
                      <Text>{`Label: ${label.Name}`}</Text>
                      <Text>{`Confidence: ${instance.Confidence.toFixed(2)}%`}</Text>
                    </Box>
                  </Tooltip>
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export { ObjectDetectionResult };
