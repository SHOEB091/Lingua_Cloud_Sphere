import { bouncy } from "ldrs";
import { Box } from "@chakra-ui/react";

bouncy.register();

const LoadingBouncyComponent = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      background="rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(20px)"
      zIndex="1000"
    >
      <l-bouncy size="100" speed="1.5" color="yellow" />
    </Box>
  );
};

export { LoadingBouncyComponent };
