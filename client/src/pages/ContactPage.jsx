import { Box, Flex, Stack, Heading } from "@chakra-ui/react";
import { contacts } from "../utils/contacts";
import { ContactCard } from "../components/ContactCard";
import "@fontsource/press-start-2p";

const ContactPage = () => {
  return (
    <Box p={4} bgColor="gray.800">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Heading
          color={"white"}
          fontSize={"4xl"}
          textAlign={"center"}
          fontFamily={"'Press Start 2P', 'cursive'"}
        >
          Meet the Developers
        </Heading>
        <Flex justify="center">
          {contacts.map((contact, index) => (
            <Box key={index} m={4}>
              <ContactCard
                name={contact.name}
                avatar={contact.avatar}
                linkedin={contact.linkedin}
              />
            </Box>
          ))}
        </Flex>
      </Stack>
    </Box>
  );
};

export default ContactPage;
