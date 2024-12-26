import { Box, Tooltip, Text, VStack, Link } from "@chakra-ui/react";
import { useState } from "react";

const CelebrityFacesResult = ({ image, celebrityFaces }) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoveredBoundingBoxIndex, setHoveredBoundingBoxIndex] = useState(null);

  const handleMouseEnter = (face, event) => {
    const { pageX, pageY } = event;
    setHoverInfo(face);
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

  const handleBoundingBoxClick = (urls) => {
    if (Array.isArray(urls) && urls.length > 0) {
      window.location.href = urls[0];
    }
  };

  return (
    <Box
      p={4}
      bg="gray.100"
      borderRadius="md"
      mb={4}
      maxWidth="1200px"
      mx="auto"
    >
      {/* Image and Bounding Boxes */}
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={4}
      >
        <img
          src={URL.createObjectURL(image)}
          alt="Analysis"
          style={{ maxWidth: "100%", display: "block", position: "relative" }}
        />
        {celebrityFaces?.map((face, index) => {
          const boundingBox = face.Face?.BoundingBox || {};
          const { Width = 0, Height = 0, Left = 0, Top = 0 } = boundingBox;
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
              onClick={() => handleBoundingBoxClick(face.Urls)}
            >
              {isHovered &&
                face.Face?.Landmarks?.map((landmark, i) => {
                  const { X = 0, Y = 0 } = landmark;

                  if (X < 0 || Y < 0) return null;

                  const landmarkStyles = {
                    position: "absolute",
                    backgroundColor: "blue",
                    borderRadius: "50%",
                    width: "6px",
                    height: "6px",
                    transform: "translate(-50%, -50%)",
                    left: `${((X - Left) * 100) / Width}%`,
                    top: `${((Y - Top) * 100) / Height}%`,
                    pointerEvents: "none",
                  };

                  return (
                    <Box
                      key={i}
                      style={landmarkStyles}
                      onMouseEnter={(e) => handleMouseEnter(landmark, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              {isHovered && (
                <Tooltip
                  label={`Name: ${face.Name || "Unknown"}\n Confidence: ${face.Face?.Confidence?.toFixed(2) || "N/A"}%`}
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
                    {/* <Text>{`Name: ${face.Name || "Unknown"}`}</Text> */}
                  </Box>
                </Tooltip>
              )}
            </Box>
          );
        })}
      </Box>

      {/* List of Celebrity Details */}
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={4}
        overflowY="auto"
        maxHeight="600px"
      >
        <VStack align="start" spacing={3}>
          {celebrityFaces?.map((face, index) => (
            <Box key={index} borderBottom="1px solid gray" pb={2} mb={2}>
              <Text fontWeight="bold">{face.Name || "Unknown"}</Text>
              {face.Urls?.map((url, urlIndex) => (
                <Link key={urlIndex} href={url} isExternal color="teal.500">
                  {url}
                </Link>
              ))}
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export { CelebrityFacesResult };
