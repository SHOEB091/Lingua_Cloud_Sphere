import { Box, Tooltip, Text } from "@chakra-ui/react";
import { useState } from "react";

const FacialAnalysisResult = ({ image, result }) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoveredBoundingBoxIndex, setHoveredBoundingBoxIndex] = useState(null);

  const handleMouseEnter = (landmark, event) => {
    const { pageX, pageY } = event;
    setHoverInfo(landmark);
    setHoverPos({ x: pageX, y: pageY });
  };

  const handleMouseLeave = () => {
    setHoverInfo(null);
  };

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
        {result.map((face, index) => {
          const { Width, Height, Left, Top } = face.BoundingBox;
          const isHovered = hoveredBoundingBoxIndex === index;
          return (
            <Box
              key={index}
              position="absolute"
              border="2px solid red"
              style={{
                width: `${Width * 100}%`,
                height: `${Height * 100}%`,
                left: `${Left * 100}%`,
                top: `${Top * 100}%`,
              }}
              onMouseEnter={() => handleBoundingBoxMouseEnter(index)}
              onMouseLeave={handleBoundingBoxMouseLeave}
            >
              {isHovered &&
                face.Landmarks.map((landmark, i) => (
                  <Box
                    key={i}
                    position="absolute"
                    bg="blue"
                    borderRadius="50%"
                    width="6px"
                    height="6px"
                    transform="translate(-50%, -50%)"
                    style={{
                      left: `${((landmark.X - Left) * 100) / Width}%`,
                      top: `${((landmark.Y - Top) * 100) / Height}%`,
                    }}
                    onMouseEnter={(e) => handleMouseEnter(landmark, e)}
                    onMouseLeave={handleMouseLeave}
                  ></Box>
                ))}
            </Box>
          );
        })}
        {hoverInfo && (
          <Tooltip
            label={`Type: ${hoverInfo.Type}, X: ${hoverInfo.X.toFixed(
              2
            )}, Y: ${hoverInfo.Y.toFixed(2)}`}
            placement="top"
            isOpen={true}
            bg="blue.600"
            color="white"
            position="absolute"
            left={`${hoverPos.x}px`}
            top={`${hoverPos.y}px`}
          >
            <Box
              position="absolute"
              bg="rgba(0, 0, 0, 0.75)"
              color="white"
              padding="2px 4px"
              borderRadius="3px"
              pointerEvents="none"
              zIndex="10"
            >
              <Text>{`Type: ${hoverInfo.Type}`}</Text>
              <Text>{`X: ${hoverInfo.X.toFixed(2)}`}</Text>
              <Text>{`Y: ${hoverInfo.Y.toFixed(2)}`}</Text>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export { FacialAnalysisResult };
